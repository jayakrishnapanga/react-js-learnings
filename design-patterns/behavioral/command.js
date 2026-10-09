/**
 * COMMAND — Encapsulate a request as an object, enabling undo, queue, and logging.
 *
 * Interview: "How would you implement undo/redo or background jobs?"
 * Answer: Each action is a Command object with execute() and undo(); queue them in Bull.
 *
 * MERN: Bull/BullMQ job processors, audit trails, transaction rollback
 *
 * Trade-offs:
 *   + Decouples invoker from receiver; supports queuing and history
 *   - More classes/objects for simple operations
 */

class AddToCartCommand {
  constructor(cart, product, quantity) {
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
  }

  execute() {
    this.cart.add(this.product.id, this.quantity);
    console.log(`Added ${this.quantity}x ${this.product.name} to cart`);
  }

  undo() {
    this.cart.remove(this.product.id, this.quantity);
    console.log(`Removed ${this.quantity}x ${this.product.name} from cart`);
  }
}

class UpdateQuantityCommand {
  constructor(cart, productId, newQty) {
    this.cart = cart;
    this.productId = productId;
    this.newQty = newQty;
    this.previousQty = cart.getQuantity(productId);
  }

  execute() {
    this.cart.setQuantity(this.productId, this.newQty);
    console.log(`Updated ${this.productId} quantity to ${this.newQty}`);
  }

  undo() {
    this.cart.setQuantity(this.productId, this.previousQty);
    console.log(`Reverted ${this.productId} quantity to ${this.previousQty}`);
  }
}

class ShoppingCart {
  constructor() {
    this.items = {};
  }

  add(productId, qty) {
    this.items[productId] = (this.items[productId] || 0) + qty;
  }

  remove(productId, qty) {
    this.items[productId] = Math.max(0, (this.items[productId] || 0) - qty);
  }

  setQuantity(productId, qty) {
    this.items[productId] = qty;
  }

  getQuantity(productId) {
    return this.items[productId] || 0;
  }
}

class CommandHistory {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) command.undo();
  }
}

// Bull queue maps 1:1 — each job is a serialized command
// queue.add('send-email', { to, subject, body })

// --- Demo ---
const cart = new ShoppingCart();
const history = new CommandHistory();

const laptop = { id: 'prod-1', name: 'Laptop' };

history.execute(new AddToCartCommand(cart, laptop, 1));
history.execute(new UpdateQuantityCommand(cart, 'prod-1', 3));
console.log('Cart:', cart.items);

history.undo(); // revert quantity
history.undo(); // remove item
console.log('Cart after undo:', cart.items);
