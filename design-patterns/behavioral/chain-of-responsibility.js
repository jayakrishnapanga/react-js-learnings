/**
 * CHAIN OF RESPONSIBILITY — Pass a request along a chain until something handles it.
 *
 * Interview: "How does Express middleware work?"
 * Answer: Each middleware is a handler — call next() to pass down the chain.
 *
 * MERN: Express middleware, validation pipelines, auth checks
 *
 * Trade-offs:
 *   + Flexible ordering; add/remove handlers easily
 *   - No guarantee any handler processes the request; order is critical
 */

class Middleware {
  setNext(next) {
    this.next = next;
    return next; // enable chaining: a.setNext(b).setNext(c)
  }

  handle(req, res) {
    if (this.next) return this.next.handle(req, res);
  }
}

class LoggerMiddleware extends Middleware {
  handle(req, res) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    return super.handle(req, res);
  }
}

class AuthMiddleware extends Middleware {
  handle(req, res) {
    if (!req.headers.authorization) {
      res.status = 401;
      console.log('[AUTH] Rejected — no token');
      return res;
    }
    req.user = { id: 'user-123' };
    console.log('[AUTH] Authenticated');
    return super.handle(req, res);
  }
}

class ValidationMiddleware extends Middleware {
  handle(req, res) {
    if (req.method === 'POST' && !req.body) {
      res.status = 400;
      console.log('[VALIDATION] Rejected — missing body');
      return res;
    }
    console.log('[VALIDATION] Passed');
    return super.handle(req, res);
  }
}

class RouteHandler extends Middleware {
  handle(req, res) {
    res.status = 200;
    res.body = { message: 'Hello', user: req.user };
    console.log('[HANDLER] Response sent');
    return res;
  }
}

// Build the chain (same order as app.use() in Express)
const pipeline = new LoggerMiddleware();
pipeline
  .setNext(new AuthMiddleware())
  .setNext(new ValidationMiddleware())
  .setNext(new RouteHandler());

// --- Demo ---
console.log('--- Valid request ---');
pipeline.handle(
  { method: 'GET', url: '/api/profile', headers: { authorization: 'Bearer token' } },
  { status: null, body: null }
);

console.log('\n--- Missing auth ---');
pipeline.handle(
  { method: 'GET', url: '/api/profile', headers: {} },
  { status: null, body: null }
);
