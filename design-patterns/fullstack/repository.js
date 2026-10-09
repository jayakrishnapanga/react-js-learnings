/**
 * REPOSITORY — Abstract data access behind a consistent interface.
 *
 * Interview: "How do you test services without hitting the real database?"
 * Answer: Repository interface + in-memory implementation for tests, Mongo impl for prod.
 *
 * Combines: Adapter (wraps Mongoose) + Strategy (swap implementations)
 *
 * Trade-offs:
 *   + Testable, swappable data layer; services stay DB-agnostic
 *   - Extra abstraction; can feel heavy for simple CRUD apps
 */

// Interface (in TypeScript you'd use `interface IUserRepository`)
// All implementations must provide these methods

class MongoUserRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async findByEmail(email) {
    return this.model.findOne({ email }).lean();
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
  }
}

// In-memory implementation for unit tests — no DB needed
class InMemoryUserRepository {
  constructor() {
    this.store = new Map();
    this.nextId = 1;
  }

  async findById(id) {
    return this.store.get(String(id)) ?? null;
  }

  async findByEmail(email) {
    return [...this.store.values()].find((u) => u.email === email) ?? null;
  }

  async create(data) {
    const user = { id: String(this.nextId++), ...data };
    this.store.set(user.id, user);
    return user;
  }

  async update(id, data) {
    const existing = this.store.get(String(id));
    if (!existing) return null;
    const updated = { ...existing, ...data };
    this.store.set(String(id), updated);
    return updated;
  }
}

// Service depends on interface, not implementation (Dependency Inversion)
class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register({ email, password, name }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const hashedPassword = `hashed_${password}`; // simplified
    return this.userRepo.create({ email, password: hashedPassword, name });
  }

  async getProfile(userId) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    const { password, ...profile } = user;
    return profile;
  }
}

// --- Demo: same service, different repos ---
(async () => {
  const repo = new InMemoryUserRepository();
  const auth = new AuthService(repo);

  const user = await auth.register({
    email: 'dev@example.com',
    password: 'secret123',
    name: 'Developer',
  });
  console.log('Registered:', user);

  const profile = await auth.getProfile(user.id);
  console.log('Profile (no password):', profile);

  try {
    await auth.register({ email: 'dev@example.com', password: 'x', name: 'Dup' });
  } catch (e) {
    console.log('Expected error:', e.message);
  }
})();
