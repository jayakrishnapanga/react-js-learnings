/**
 * SAGA — Manage distributed transactions across multiple services with compensating actions.
 *
 * Interview: "User places order — you charge payment, reserve inventory, send email.
 *              Payment succeeds but inventory fails. What do you do?"
 * Answer: Saga — each step has a compensating rollback. If step 3 fails, undo steps 2 and 1.
 *
 * Two flavors:
 *   1. CHOREOGRAPHY — services publish events; each listens and reacts (decentralized)
 *   2. ORCHESTRATION  — central coordinator runs steps and rollbacks (easier to debug)
 *
 * MERN use cases:
 *   - Order → Payment → Inventory → Notification (e-commerce)
 *   - User signup → Create DB record → Send welcome email → Provision trial
 *   - Booking → Hold seat → Charge card → Confirm ticket
 *
 * Tools: Bull/BullMQ (orchestration), Kafka/RabbitMQ (choreography), Temporal, AWS Step Functions
 *
 * Trade-offs:
 *   + Works across microservices without 2-phase commit (which Mongo doesn't support anyway)
 *   - Eventual consistency; compensations can fail too; harder to debug in choreography
 */

const EventEmitter = require('events');

// ─────────────────────────────────────────────
// ORCHESTRATION — one coordinator controls flow
// ─────────────────────────────────────────────

class OrderSagaOrchestrator {
  constructor() {
    this.completedSteps = []; // stack for rollback (LIFO)
  }

  async execute(order) {
    this.completedSteps = []; // reset for each saga run
    console.log(`\n[SAGA] Starting order ${order.id}`);

    try {
      await this.runStep('CreateOrder', () => this.createOrder(order));
      await this.runStep('ChargePayment', () => this.chargePayment(order));
      await this.runStep('ReserveInventory', () => this.reserveInventory(order));
      await this.runStep('SendConfirmation', () => this.sendConfirmation(order));

      console.log(`[SAGA] Order ${order.id} completed successfully ✅`);
      return { success: true, orderId: order.id };
    } catch (err) {
      console.log(`[SAGA] Step failed: ${err.message} — starting rollback`);
      await this.compensate();
      return { success: false, error: err.message };
    }
  }

  async runStep(name, action) {
    console.log(`  → ${name}...`);
    const result = await action();
    this.completedSteps.push({ name, compensate: result.compensate });
    console.log(`  ✓ ${name} done`);
  }

  async compensate() {
    // Roll back in reverse order
    while (this.completedSteps.length) {
      const step = this.completedSteps.pop();
      console.log(`  ↩ Compensating: ${step.name}`);
      await step.compensate();
    }
    console.log('[SAGA] Rollback complete');
  }

  // --- Simulated services ---

  async createOrder(order) {
    return {
      compensate: async () => console.log('    Deleted order record'),
    };
  }

  async chargePayment(order) {
    if (order.simulatePaymentFailure) throw new Error('Payment declined');
    const chargeId = `ch_${Date.now()}`;
    return {
      compensate: async () => console.log(`    Refunded charge ${chargeId}`),
    };
  }

  async reserveInventory(order) {
    if (order.simulateInventoryFailure) throw new Error('Out of stock');
    return {
      compensate: async () => console.log('    Released reserved inventory'),
    };
  }

  async sendConfirmation(order) {
    return {
      compensate: async () => console.log('    Sent cancellation email'),
    };
  }
}

// ─────────────────────────────────────────────
// CHOREOGRAPHY — services react to events
// ─────────────────────────────────────────────

class SagaEventBus extends EventEmitter {}

function setupChoreographySaga(bus) {
  const sagaState = new Map(); // orderId → { completedSteps: [] }

  bus.on('order:created', async ({ orderId, order }) => {
    sagaState.set(orderId, { order, completedSteps: ['order:created'] });
    console.log(`  [PaymentService] Charging order ${orderId}...`);

    if (order.simulatePaymentFailure) {
      bus.emit('payment:failed', { orderId, reason: 'Payment declined' });
    } else {
      bus.emit('payment:completed', { orderId, chargeId: `ch_${Date.now()}` });
    }
  });

  bus.on('payment:completed', async ({ orderId, chargeId }) => {
    const state = sagaState.get(orderId);
    state.completedSteps.push('payment:completed');
    state.chargeId = chargeId;
    console.log(`  [InventoryService] Reserving stock for ${orderId}...`);

    if (state.order.simulateInventoryFailure) {
      bus.emit('inventory:failed', { orderId, reason: 'Out of stock' });
    } else {
      bus.emit('inventory:reserved', { orderId });
    }
  });

  bus.on('inventory:reserved', ({ orderId }) => {
    const state = sagaState.get(orderId);
    state.completedSteps.push('inventory:reserved');
    console.log(`  [NotificationService] Sending confirmation for ${orderId}`);
    bus.emit('order:completed', { orderId });
  });

  // --- Failure handlers trigger compensations ---

  bus.on('payment:failed', ({ orderId, reason }) => {
    console.log(`  [SAGA] Payment failed: ${reason}`);
    bus.emit('saga:compensate', { orderId });
  });

  bus.on('inventory:failed', ({ orderId, reason }) => {
    console.log(`  [Saga] Inventory failed: ${reason}`);
    bus.emit('saga:compensate', { orderId });
  });

  bus.on('saga:compensate', async ({ orderId }) => {
    const state = sagaState.get(orderId);
    if (!state) return;

    console.log(`  [SAGA] Rolling back order ${orderId}...`);
    // Reverse completed steps
    for (const step of [...state.completedSteps].reverse()) {
      if (step === 'payment:completed') {
        console.log(`    Refunded ${state.chargeId}`);
      }
      if (step === 'order:created') {
        console.log(`    Deleted order ${orderId}`);
      }
    }
    sagaState.delete(orderId);
    console.log(`  [SAGA] Rollback complete for ${orderId}`);
  });

  bus.on('order:completed', ({ orderId }) => {
    console.log(`  [SAGA] Order ${orderId} completed ✅`);
    sagaState.delete(orderId);
  });
}

// --- Demo ---
(async () => {
  console.log('═══════════════════════════════════════');
  console.log('ORCHESTRATION SAGA');
  console.log('═══════════════════════════════════════');

  const orchestrator = new OrderSagaOrchestrator();

  console.log('\n--- Happy path ---');
  await orchestrator.execute({ id: 'ORD-001', total: 149.99 });

  console.log('\n--- Inventory failure → rollback ---');
  await orchestrator.execute({
    id: 'ORD-002',
    total: 99,
    simulateInventoryFailure: true,
  });

  console.log('\n\n═══════════════════════════════════════');
  console.log('CHOREOGRAPHY SAGA (event-driven)');
  console.log('═══════════════════════════════════════');

  const bus = new SagaEventBus();
  setupChoreographySaga(bus);

  console.log('\n--- Happy path ---');
  bus.emit('order:created', { orderId: 'ORD-101', order: { total: 49 } });

  await new Promise((r) => setTimeout(r, 100));

  console.log('\n--- Payment failure → rollback ---');
  bus.emit('order:created', {
    orderId: 'ORD-102',
    order: { total: 29, simulatePaymentFailure: true },
  });

  await new Promise((r) => setTimeout(r, 100));
})();
