/**
 * OBSERVER — Define one-to-many dependency; when subject changes, observers are notified.
 *
 * Interview: "How do real-time features work?"
 * Answer: Subject (event source) notifies observers (UI, cache, analytics, push service).
 *
 * MERN: Node EventEmitter, Socket.io, Redux reducers, React Context, DOM events
 *
 * Trade-offs:
 *   + Loose coupling between publisher and subscribers
 *   - Hard to debug event chains; memory leaks if you forget to unsubscribe
 */

const EventEmitter = require('events');

// Custom implementation (Node's EventEmitter works the same way)
class OrderSubject extends EventEmitter {
  placeOrder(order) {
    console.log(`Order ${order.id} placed`);
    this.emit('order:placed', order);
  }

  shipOrder(orderId) {
    console.log(`Order ${orderId} shipped`);
    this.emit('order:shipped', { orderId });
  }
}

// Observers — each handles one concern
function inventoryObserver(order) {
  console.log(`[Inventory] Reserve stock for order ${order.id}`);
}

function emailObserver(order) {
  console.log(`[Email] Send confirmation to ${order.email}`);
}

function analyticsObserver(order) {
  console.log(`[Analytics] Track purchase event: $${order.total}`);
}

function pushNotificationObserver({ orderId }) {
  console.log(`[Push] Notify user: Order ${orderId} is on the way!`);
}

// --- Demo ---
const orders = new OrderSubject();

orders.on('order:placed', inventoryObserver);
orders.on('order:placed', emailObserver);
orders.on('order:placed', analyticsObserver);
orders.on('order:shipped', pushNotificationObserver);

orders.placeOrder({ id: 'ORD-001', email: 'buyer@example.com', total: 149.99 });
console.log('---');
orders.shipOrder('ORD-001');

// React equivalent: useEffect subscribing to a store/socket, cleanup on unmount
// const unsubscribe = store.subscribe(handleChange); return unsubscribe;
