/**
 * CIRCUIT BREAKER — Stop calling a failing service; fail fast instead of hanging.
 *
 * Interview: "Your app calls Stripe and it's down — what happens?"
 * Answer: After N failures, circuit OPENS → return fallback immediately.
 *         After a timeout, HALF_OPEN → try one request; success CLOSES circuit.
 *
 * MERN use cases:
 *   - Calling payment APIs (Stripe, Razorpay)
 *   - Microservice calls between Node services
 *   - Third-party APIs (SendGrid, Twilio, Google Maps)
 *   - Redis/cache when cache cluster is unhealthy
 *
 * Libraries: opossum (Node), resilience4j (Java), Polly (.NET)
 *
 * Trade-offs:
 *   + Prevents cascade failures; faster error responses; gives downstream time to recover
 *   - Fallback logic adds complexity; tuning thresholds (failure count, timeout) matters
 */

const STATES = { CLOSED: 'CLOSED', OPEN: 'OPEN', HALF_OPEN: 'HALF_OPEN' };

class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold ?? 3;
    this.resetTimeoutMs = options.resetTimeoutMs ?? 5000;
    this.name = options.name ?? 'unnamed';

    this.state = STATES.CLOSED;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }

  async execute(fn, fallback) {
    if (this.state === STATES.OPEN) {
      if (Date.now() - this.lastFailureTime >= this.resetTimeoutMs) {
        this.state = STATES.HALF_OPEN;
        console.log(`[${this.name}] Circuit → HALF_OPEN (testing recovery)`);
      } else {
        console.log(`[${this.name}] Circuit OPEN — returning fallback immediately`);
        return fallback();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      if (this.state === STATES.OPEN) {
        console.log(`[${this.name}] Circuit tripped — returning fallback`);
        return fallback();
      }
      throw err;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    if (this.state === STATES.HALF_OPEN) {
      this.state = STATES.CLOSED;
      console.log(`[${this.name}] Circuit → CLOSED (recovered)`);
    }
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = STATES.OPEN;
      console.log(`[${this.name}] Circuit → OPEN after ${this.failureCount} failures`);
    }
  }

  getState() {
    return this.state;
  }
}

// Simulated external payment service (sometimes fails)
let callCount = 0;
async function callStripeAPI(amount) {
  callCount++;
  // Fails for calls 1–4, succeeds after that (simulating outage then recovery)
  if (callCount <= 4) {
    throw new Error('Stripe API timeout');
  }
  return { success: true, chargeId: `ch_${Date.now()}`, amount };
}

function stripeFallback(amount) {
  return {
    success: false,
    queued: true,
    message: `Payment of $${amount} queued — will retry when Stripe recovers`,
  };
}

// Express-style wrapper
function withCircuitBreaker(breaker, serviceFn, fallbackFn) {
  return async (req, res) => {
    try {
      const result = await breaker.execute(
        () => serviceFn(req.body),
        () => fallbackFn(req.body)
      );
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: 'Service unavailable', details: err.message });
    }
  };
}

// --- Demo ---
(async () => {
  const stripeBreaker = new CircuitBreaker({
    name: 'Stripe',
    failureThreshold: 3,
    resetTimeoutMs: 2000,
  });

  console.log('=== Simulating Stripe outage ===\n');

  for (let i = 1; i <= 6; i++) {
    console.log(`\n--- Attempt ${i} (circuit: ${stripeBreaker.getState()}) ---`);
    try {
      const result = await stripeBreaker.execute(
        () => callStripeAPI(99),
        () => stripeFallback(99)
      );
      console.log('Result:', result);
    } catch (err) {
      console.log('Error (circuit still CLOSED):', err.message);
    }

    if (i === 4) {
      console.log('\n⏳ Waiting 2s for reset timeout...\n');
      await new Promise((r) => setTimeout(r, 2100));
    }
  }
})();
