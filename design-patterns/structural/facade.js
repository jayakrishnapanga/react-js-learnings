/**
 * FACADE — Provide a simple interface to a complex subsystem.
 *
 * Interview: "How do you hide complexity in your service layer?"
 * Answer: Facade orchestrates DB, cache, email, and queue — controller calls one method.
 *
 * Trade-offs:
 *   + Simplifies client code; good boundary for your API
 *   - Can become a "god service" if it does too much — keep facades focused
 */

// Complex subsystems
class UserRepository {
  async findById(id) {
    console.log(`[DB] SELECT * FROM users WHERE id = ${id}`);
    return { id, email: 'user@example.com', name: 'Alice' };
  }

  async update(id, data) {
    console.log(`[DB] UPDATE users SET ... WHERE id = ${id}`, data);
    return { id, ...data };
  }
}

class CacheService {
  async get(key) {
    console.log(`[CACHE] GET ${key}`);
    return null; // cache miss for demo
  }

  async set(key, value, ttl = 3600) {
    console.log(`[CACHE] SET ${key} (ttl: ${ttl}s)`);
  }

  async invalidate(key) {
    console.log(`[CACHE] DEL ${key}`);
  }
}

class EmailService {
  async send(to, subject, body) {
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
  }
}

class AuditLog {
  log(action, userId, metadata) {
    console.log(`[AUDIT] ${action} by user ${userId}`, metadata);
  }
}

// Facade — one clean API for controllers
class UserService {
  constructor() {
    this.users = new UserRepository();
    this.cache = new CacheService();
    this.email = new EmailService();
    this.audit = new AuditLog();
  }

  async getUser(id) {
    const cacheKey = `user:${id}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const user = await this.users.findById(id);
    await this.cache.set(cacheKey, user);
    return user;
  }

  async updateProfile(id, data) {
    const user = await this.users.update(id, data);
    await this.cache.invalidate(`user:${id}`);
    await this.email.send(user.email, 'Profile Updated', 'Your profile was updated.');
    this.audit.log('PROFILE_UPDATE', id, { fields: Object.keys(data) });
    return user;
  }
}

// Controller stays thin — only talks to the facade
async function updateProfileController(req, res) {
  const service = new UserService();
  const user = await service.updateProfile(req.params.id, req.body);
  res.json({ success: true, user });
}

// --- Demo ---
(async () => {
  const service = new UserService();
  await service.getUser(42);
  console.log('---');
  await service.updateProfile(42, { name: 'Alice Updated' });
})();
