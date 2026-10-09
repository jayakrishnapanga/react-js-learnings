/**
 * MVC + SERVICE LAYER — Standard MERN API architecture (composite of several patterns).
 *
 * Interview: "How do you structure a Node/Express API?"
 *
 * Layers:
 *   Route      → maps HTTP to controller (Facade entry point)
 *   Controller → handles req/res, calls service (thin)
 *   Service    → business logic (Facade + Strategy)
 *   Repository → data access (Adapter)
 *   Model      → schema/entity (Factory via mongoose.model)
 *
 * This is what interviewers want when they say "clean architecture" at mid-level.
 */

// --- Model (Mongoose-style) ---
const users = new Map([
  ['1', { id: '1', name: 'Alice', email: 'alice@example.com', active: true }],
  ['2', { id: '2', name: 'Bob', email: 'bob@example.com', active: false }],
]);

// --- Repository (data access — Adapter pattern) ---
class UserRepository {
  async findAll(filter = {}) {
    let results = [...users.values()];
    if (filter.active !== undefined) {
      results = results.filter((u) => u.active === filter.active);
    }
    return results;
  }

  async findById(id) {
    return users.get(id) ?? null;
  }

  async create(data) {
    const id = String(users.size + 1);
    const user = { id, ...data };
    users.set(id, user);
    return user;
  }
}

// --- Service (business logic — Facade) ---
class UserService {
  constructor(repo) {
    this.repo = repo; // Dependency Injection
  }

  async getActiveUsers() {
    return this.repo.findAll({ active: true });
  }

  async registerUser({ name, email }) {
    if (!name || !email) throw new Error('Name and email required');
    if (!email.includes('@')) throw new Error('Invalid email');
    return this.repo.create({ name, email, active: true });
  }

  async deactivateUser(id) {
    const user = await this.repo.findById(id);
    if (!user) throw new Error('User not found');
    user.active = false;
    return user;
  }
}

// --- Controller (HTTP layer — thin) ---
class UserController {
  constructor(service) {
    this.service = service;
  }

  async listActive(req, res) {
    try {
      const users = await this.service.getActiveUsers();
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async register(req, res) {
    try {
      const user = await this.service.registerUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

// --- Routes (Facade — simple HTTP mapping) ---
function createUserRoutes(controller) {
  return {
    'GET /users/active': (req, res) => controller.listActive(req, res),
    'POST /users': (req, res) => controller.register(req, res),
  };
}

// --- Demo (simulating Express) ---
const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);
const routes = createUserRoutes(controller);

(async () => {
  const mockRes = () => {
    const res = { statusCode: 200, body: null };
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (data) => { res.body = data; console.log(`[${res.statusCode}]`, JSON.stringify(data, null, 2)); };
    return res;
  };

  console.log('GET /users/active');
  await routes['GET /users/active']({}, mockRes());

  console.log('\nPOST /users');
  await routes['POST /users']({ body: { name: 'Charlie', email: 'charlie@example.com' } }, mockRes());
})();
