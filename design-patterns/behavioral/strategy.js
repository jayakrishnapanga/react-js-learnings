/**
 * STRATEGY — Define a family of algorithms, encapsulate each, make them interchangeable.
 *
 * Interview: "How do you support JWT and OAuth login?"
 * Answer: Strategy interface with JWTStrategy and OAuthStrategy; swap at runtime.
 *
 * MERN: Auth providers, sorting, pricing rules, validation rules, payment methods
 *
 * Trade-offs:
 *   + Open/Closed — add new strategies without changing existing code
 *   - Client must know which strategy to pick (often solved with Factory)
 */

class JWTStrategy {
  authenticate(credentials) {
    const { token } = credentials;
    if (!token) throw new Error('Token required');
    console.log(`[JWT] Validating token: ${token.slice(0, 10)}...`);
    return { userId: 'user-123', method: 'jwt' };
  }
}

class OAuthStrategy {
  authenticate(credentials) {
    const { provider, code } = credentials;
    console.log(`[OAuth] Exchanging code with ${provider}`);
    return { userId: 'user-456', method: 'oauth', provider };
  }
}

class LocalStrategy {
  authenticate(credentials) {
    const { email, password } = credentials;
    console.log(`[Local] Checking password for ${email}`);
    if (password !== 'correct') throw new Error('Invalid credentials');
    return { userId: 'user-789', method: 'local' };
  }
}

class AuthContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  login(credentials) {
    return this.strategy.authenticate(credentials);
  }
}

// Express middleware using strategy
function createAuthMiddleware(strategy) {
  return (req, res, next) => {
    try {
      req.user = strategy.authenticate(req.body);
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };
}

// --- Demo ---
const auth = new AuthContext(new JWTStrategy());
console.log(auth.login({ token: 'eyJhbGciOiJIUzI1NiJ9...' }));

auth.setStrategy(new OAuthStrategy());
console.log(auth.login({ provider: 'google', code: 'auth-code-xyz' }));

auth.setStrategy(new LocalStrategy());
console.log(auth.login({ email: 'dev@example.com', password: 'correct' }));
