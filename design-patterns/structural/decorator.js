/**
 * DECORATOR — Add behavior to an object without modifying its class.
 *
 * Interview: "How does Express middleware work?"
 * Answer: Each middleware decorates the request/response pipeline with new behavior.
 *
 * MERN: Express middleware, React HOCs, wrapper functions around API calls (logging, caching)
 *
 * Trade-offs:
 *   + Flexible composition; single responsibility per decorator
 *   - Order matters; debugging nested wrappers can be tricky
 */

// Base "component"
class HttpClient {
  get(url) {
    console.log(`GET ${url}`);
    return { data: { message: 'hello' }, status: 200 };
  }
}

// Decorators wrap the base client
function withLogging(client) {
  return {
    get(url) {
      console.log(`[LOG] Request started: ${url}`);
      const start = Date.now();
      const result = client.get(url);
      console.log(`[LOG] Completed in ${Date.now() - start}ms`);
      return result;
    },
  };
}

function withAuth(client, token) {
  return {
    get(url) {
      console.log(`[AUTH] Bearer ${token.slice(0, 8)}...`);
      return client.get(url);
    },
  };
}

function withRetry(client, maxRetries = 3) {
  return {
    get(url) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return client.get(url);
        } catch (err) {
          if (attempt === maxRetries) throw err;
          console.log(`[RETRY] Attempt ${attempt} failed, retrying...`);
        }
      }
    },
  };
}

// Compose decorators (order: outer → inner)
const client = withLogging(withAuth(withRetry(new HttpClient()), 'secret-token-abc'));

// Express middleware is the same pattern:
// app.use(logger) → app.use(auth) → app.use(validator) → route handler

// React HOC example (conceptual):
// const withAuth = (Component) => (props) => isLoggedIn ? <Component {...props} /> : <Redirect />

// --- Demo ---
client.get('/api/users');
