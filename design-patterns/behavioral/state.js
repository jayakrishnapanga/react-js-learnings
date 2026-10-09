/**
 * STATE — Object behavior changes when its internal state changes.
 *
 * Interview: "How do you model order status (pending → paid → shipped → delivered)?"
 * Answer: Each state is a class with allowed transitions; invalid ones throw errors.
 *
 * MERN: Order workflows, form wizards, game logic, connection states (WebSocket)
 *
 * Trade-offs:
 *   + Replaces messy if/else or switch; transitions are explicit
 *   - Many classes for simple state machines; consider XState for complex flows
 */

class Order {
  constructor(id) {
    this.id = id;
    this.state = new PendingState(this);
  }

  setState(state) {
    this.state = state;
  }

  pay() { return this.state.pay(); }
  ship() { return this.state.ship(); }
  deliver() { return this.state.deliver(); }
  cancel() { return this.state.cancel(); }
  status() { return this.state.name; }
}

class PendingState {
  name = 'PENDING';
  constructor(order) { this.order = order; }

  pay() {
    console.log(`Order ${this.order.id}: Payment received`);
    this.order.setState(new PaidState(this.order));
  }

  cancel() {
    console.log(`Order ${this.order.id}: Cancelled`);
    this.order.setState(new CancelledState(this.order));
  }

  ship() { throw new Error('Cannot ship unpaid order'); }
  deliver() { throw new Error('Cannot deliver unpaid order'); }
}

class PaidState {
  name = 'PAID';
  constructor(order) { this.order = order; }

  ship() {
    console.log(`Order ${this.order.id}: Shipped`);
    this.order.setState(new ShippedState(this.order));
  }

  cancel() {
    console.log(`Order ${this.order.id}: Refunded and cancelled`);
    this.order.setState(new CancelledState(this.order));
  }

  pay() { throw new Error('Already paid'); }
  deliver() { throw new Error('Must ship before delivery'); }
}

class ShippedState {
  name = 'SHIPPED';
  constructor(order) { this.order = order; }

  deliver() {
    console.log(`Order ${this.order.id}: Delivered`);
    this.order.setState(new DeliveredState(this.order));
  }

  pay() { throw new Error('Already paid'); }
  ship() { throw new Error('Already shipped'); }
  cancel() { throw new Error('Cannot cancel shipped order'); }
}

class DeliveredState {
  name = 'DELIVERED';
  pay() { throw new Error('Order complete'); }
  ship() { throw new Error('Order complete'); }
  deliver() { throw new Error('Already delivered'); }
  cancel() { throw new Error('Order complete'); }
}

class CancelledState {
  name = 'CANCELLED';
  pay() { throw new Error('Order cancelled'); }
  ship() { throw new Error('Order cancelled'); }
  deliver() { throw new Error('Order cancelled'); }
  cancel() { throw new Error('Already cancelled'); }
}

// --- Demo ---
const order = new Order('ORD-100');

order.pay();
console.log('Status:', order.status());

order.ship();
console.log('Status:', order.status());

order.deliver();
console.log('Status:', order.status());

try {
  order.cancel(); // throws — already delivered
} catch (e) {
  console.log('Error:', e.message);
}
