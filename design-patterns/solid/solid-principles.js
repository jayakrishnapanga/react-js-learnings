/**
 * SOLID PRINCIPLES — Interview guide for MERN stack developers
 *
 * Each section shows ❌ VIOLATION then ✅ FIX with runnable MERN-style code.
 *
 * Run: node solid/solid-principles.js
 */

console.log('═══════════════════════════════════════════════════');
console.log('SOLID PRINCIPLES FOR MERN INTERVIEWS');
console.log('═══════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════
// S — SINGLE RESPONSIBILITY PRINCIPLE (SRP)
// "A class/module should have only one reason to change."
// ═══════════════════════════════════════════════════════

console.log('── S: Single Responsibility ──\n');

// ❌ BAD: One "god" class does everything
class BadUserController {
  async register(req, res) {
    const { email, password, name } = req.body;
    // Validation
    if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
    // Hashing
    const hash = `hashed_${password}`;
    // DB access
    const user = { id: '1', email, password: hash, name };
    // Email
    console.log(`  ❌ Sending welcome email to ${email}`);
    // Response
    res.status(201).json(user);
  }
}

// ✅ GOOD: Each layer has ONE job
class UserValidator {
  validate(data) {
    if (!data.email?.includes('@')) throw new Error('Invalid email');
    if (!data.password || data.password.length < 6) throw new Error('Password too short');
    return true;
  }
}

class PasswordHasher {
  hash(password) {
    return `hashed_${password}`;
  }
}

class UserRepository {
  async create(data) {
    return { id: String(Date.now()), ...data };
  }
}

class EmailService {
  async sendWelcome(email, name) {
    console.log(`  ✅ Welcome email sent to ${email}`);
  }
}

class UserService {
  constructor(validator, hasher, repo, email) {
    this.validator = validator;
    this.hasher = hasher;
    this.repo = repo;
    this.email = email;
  }

  async register(data) {
    this.validator.validate(data);
    const user = await this.repo.create({
      email: data.email,
      password: this.hasher.hash(data.password),
      name: data.name,
    });
    await this.email.sendWelcome(user.email, user.name);
    return user;
  }
}

class GoodUserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    try {
      const user = await this.userService.register(req.body);
      const { password, ...safe } = user;
      res.status(201).json(safe);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

// Interview one-liner:
// "SRP means each module has one reason to change — controller handles HTTP,
//  service handles business logic, repository handles DB. If email template
//  changes, only EmailService changes, not the controller."

// ═══════════════════════════════════════════════════════
// O — OPEN/CLOSED PRINCIPLE (OCP)
// "Open for extension, closed for modification."
// ═══════════════════════════════════════════════════════

console.log('── O: Open/Closed ──\n');

// ❌ BAD: Adding a new payment method requires editing existing code
function badProcessPayment(method, amount) {
  if (method === 'stripe') {
    console.log(`  ❌ Stripe charge $${amount}`);
  } else if (method === 'paypal') {
    console.log(`  ❌ PayPal charge $${amount}`);
  } else if (method === 'razorpay') {
    // Every new provider = edit this function (violates OCP)
    console.log(`  ❌ Razorpay charge $${amount}`);
  }
}

// ✅ GOOD: Extend via new classes, don't modify existing code
class PaymentProcessor {
  charge(amount) {
    throw new Error('Must implement charge()');
  }
}

class StripeProcessor extends PaymentProcessor {
  charge(amount) {
    console.log(`  ✅ Stripe charged $${amount}`);
    return { provider: 'stripe', success: true };
  }
}

class PayPalProcessor extends PaymentProcessor {
  charge(amount) {
    console.log(`  ✅ PayPal charged $${amount}`);
    return { provider: 'paypal', success: true };
  }
}

class RazorpayProcessor extends PaymentProcessor {
  charge(amount) {
    console.log(`  ✅ Razorpay charged ₹${amount}`);
    return { provider: 'razorpay', success: true };
  }
}

// CheckoutService never changes when you add new providers
class CheckoutService {
  processPayment(processor, amount) {
    return processor.charge(amount);
  }
}

// Interview one-liner:
// "OCP means I add Razorpay by creating a new RazorpayProcessor class,
//  not by adding another if/else. Same idea as Express middleware —
//  add new behavior without touching existing routes."

// ═══════════════════════════════════════════════════════
// L — LISKOV SUBSTITUTION PRINCIPLE (LSP)
// "Subtypes must be substitutable for their base type."
// ═══════════════════════════════════════════════════════

console.log('── L: Liskov Substitution ──\n');

// ❌ BAD: Square extends Rectangle but breaks expected behavior
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  setWidth(w) { this.width = w; }
  setHeight(h) { this.height = h; }
  area() { return this.width * this.height; }
}

class BadSquare extends Rectangle {
  setWidth(w) { this.width = w; this.height = w; } // breaks LSP!
  setHeight(h) { this.width = h; this.height = h; }
}

function printArea(shape) {
  shape.setWidth(5);
  shape.setHeight(4);
  return shape.area(); // Expect 20, but Square returns 16
}

// ✅ GOOD: All notification channels honor the same contract
class NotificationChannel {
  send(recipient, message) {
    throw new Error('Must implement send()');
  }
}

class EmailChannel extends NotificationChannel {
  send(recipient, message) {
    console.log(`  ✅ Email to ${recipient}: ${message}`);
    return { delivered: true, channel: 'email' };
  }
}

class SMSChannel extends NotificationChannel {
  send(recipient, message) {
    console.log(`  ✅ SMS to ${recipient}: ${message}`);
    return { delivered: true, channel: 'sms' };
  }
}

class PushChannel extends NotificationChannel {
  send(recipient, message) {
    console.log(`  ✅ Push to ${recipient}: ${message}`);
    return { delivered: true, channel: 'push' };
  }
}

// Any channel works — caller doesn't need to know which one
class NotificationService {
  notify(channel, recipient, message) {
    return channel.send(recipient, message); // works for ALL channels
  }
}

// Interview one-liner:
// "LSP means any PaymentProcessor I pass to CheckoutService must actually
//  work — no 'BitcoinProcessor' that throws 'not supported'. If it implements
//  the interface, it must honor the contract."

// ═══════════════════════════════════════════════════════
// I — INTERFACE SEGREGATION PRINCIPLE (ISP)
// "Clients shouldn't depend on methods they don't use."
// ═══════════════════════════════════════════════════════

console.log('── I: Interface Segregation ──\n');

// ❌ BAD: Fat interface forces implementers to stub unused methods
class BadStorage {
  save() { throw new Error('Not implemented'); }
  findById() { throw new Error('Not implemented'); }
  findAll() { throw new Error('Not implemented'); }
  delete() { throw new Error('Not implemented'); }
  uploadFile() { throw new Error('Not implemented'); } // not all storage needs this
  generateSignedUrl() { throw new Error('Not implemented'); }
}

class BadMongoRepo extends BadStorage {
  save(doc) { return doc; }
  findById(id) { return { id }; }
  findAll() { return []; }
  delete(id) { return true; }
  uploadFile() { throw new Error('Mongo is not a file store!'); } // forced stub
  generateSignedUrl() { throw new Error('Not applicable!'); }
}

// ✅ GOOD: Small, focused interfaces
class ReadableRepository {
  findById(id) { throw new Error('Must implement'); }
  findAll(filter) { throw new Error('Must implement'); }
}

class WritableRepository {
  save(doc) { throw new Error('Must implement'); }
  delete(id) { throw new Error('Must implement'); }
}

class FileStorage {
  upload(key, buffer) { throw new Error('Must implement'); }
  getSignedUrl(key) { throw new Error('Must implement'); }
}

class MongoUserRepo extends ReadableRepository {
  findById(id) { return { id, name: 'Alice', email: 'alice@example.com' }; }
  findAll() { return [{ id: '1', name: 'Alice', email: 'alice@example.com' }]; }
}

class S3FileStorage extends FileStorage {
  upload(key, buffer) {
    console.log(`  ✅ Uploaded ${key} to S3`);
    return { key };
  }
  getSignedUrl(key) {
    return `https://s3.amazonaws.com/bucket/${key}?signed=true`;
  }
}

// Read-only report service only depends on what it needs
class UserReportService {
  constructor(readRepo) {
    this.repo = readRepo; // only needs findById/findAll, not save/delete/upload
  }

  async getActiveUsers() {
    return (await this.repo.findAll()).filter((u) => u.active !== false);
  }
}

// Interview one-liner:
// "ISP means don't force a read-only analytics service to depend on a fat
//  UserRepository with create/update/delete/upload. Split into ReadableRepo
//  and WritableRepo — each client gets only what it needs."

// ═══════════════════════════════════════════════════════
// D — DEPENDENCY INVERSION PRINCIPLE (DIP)
// "Depend on abstractions, not concretions."
// ═══════════════════════════════════════════════════════

console.log('── D: Dependency Inversion ──\n');

// ❌ BAD: Service directly creates concrete dependencies
class BadOrderService {
  async placeOrder(orderData) {
    const db = new MongoUserRepository(); // hardcoded — can't test without Mongo
    const payment = new StripeProcessor(); // hardcoded — can't swap providers
    const user = await db.findById(orderData.userId);
    return payment.charge(orderData.amount);
  }
}

// ✅ GOOD: Dependencies injected from outside
class OrderService {
  constructor(userRepo, paymentProcessor, emailService) {
    this.userRepo = userRepo;
    this.payment = paymentProcessor;
    this.email = emailService;
  }

  async placeOrder({ userId, amount, items }) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    const result = this.payment.charge(amount);
    await this.email.sendWelcome(user.email, `Order confirmed: $${amount}`);
    return { ...result, userId, items };
  }
}

// Production wiring (Express app setup / DI container)
function createApp() {
  const userRepo = new MongoUserRepo();
  const payment = new StripeProcessor();
  const email = new EmailService();
  const orderService = new OrderService(userRepo, payment, email);
  return orderService;
}

// Test wiring — swap in mocks, no real DB or Stripe
function createTestApp() {
  const mockRepo = { findById: async (id) => ({ id, email: 'test@test.com' }) };
  const mockPayment = { charge: (amt) => ({ success: true, amount: amt }) };
  const mockEmail = { sendWelcome: async () => {} };
  return new OrderService(mockRepo, mockPayment, mockEmail);
}

// Interview one-liner:
// "DIP means OrderService depends on 'a payment processor', not Stripe specifically.
//  I inject dependencies in app.js — real ones in prod, mocks in tests.
//  Same pattern as React Context or passing props instead of importing globals."

// ═══════════════════════════════════════════════════════
// DEMO — all principles working together
// ═══════════════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════════');
console.log('DEMO: All SOLID principles together');
console.log('═══════════════════════════════════════════════════\n');

(async () => {
  // S + D: thin controller, injected service
  const userService = new UserService(
    new UserValidator(),
    new PasswordHasher(),
    new UserRepository(),
    new EmailService()
  );
  const controller = new GoodUserController(userService);
  await controller.register(
    { body: { email: 'dev@example.com', password: 'secret123', name: 'Dev' } },
    {
      status(code) { this.statusCode = code; return this; },
      json(data) { console.log(`Register [${this.statusCode}]:`, data); },
    }
  );

  // O + L: swap payment processors without changing checkout
  const checkout = new CheckoutService();
  checkout.processPayment(new StripeProcessor(), 99);
  checkout.processPayment(new RazorpayProcessor(), 799);

  // I: report service uses read-only repo
  const report = new UserReportService(new MongoUserRepo());
  console.log('Active users:', await report.getActiveUsers());

  // D: test vs prod wiring
  const prodOrders = createApp();
  const testOrders = createTestApp();
  console.log('Prod order:', await prodOrders.placeOrder({ userId: '1', amount: 49, items: ['book'] }));
  console.log('Test order:', await testOrders.placeOrder({ userId: '1', amount: 49, items: ['book'] }));

  // LSP check
  console.log('\nLSP check — Rectangle area:', printArea(new Rectangle(0, 0))); // 20
  console.log('LSP violation — Square area:', printArea(new BadSquare(0, 0))); // 16 (expected 20!)
})();
