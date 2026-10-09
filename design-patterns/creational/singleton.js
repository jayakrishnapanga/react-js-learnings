/**
 * SINGLETON — Ensure a class has only one instance and provide global access.
 *
 * Interview: "How do you manage a DB connection in Node?"
 * Answer: Connection pool as singleton — one pool shared across the app.
 *
 * Trade-offs:
 *   + Controlled access to shared resource
 *   - Hard to test (global state), hidden dependencies
 *   - In Node, module cache already gives you singleton-like behavior
 */

class DatabaseConnection {
  static #instance = null;

  constructor(connectionString) {
    if (DatabaseConnection.#instance) {
      return DatabaseConnection.#instance;
    }
    this.connectionString = connectionString;
    this.connected = false;
    DatabaseConnection.#instance = this;
  }

  connect() {
    if (this.connected) return;
    console.log(`Connected to ${this.connectionString}`);
    this.connected = true;
  }

  query(sql) {
    console.log(`Executing: ${sql}`);
    return [{ id: 1, name: 'Alice' }];
  }
}

// Node.js modules are naturally singletons — this is the idiomatic approach:
const config = { mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/app' };
module.exports = config; // require() caches this; same object everywhere

// --- Demo ---
const db1 = new DatabaseConnection('mongodb://localhost:27017/myapp');
const db2 = new DatabaseConnection('mongodb://localhost:27017/other'); // ignored — same instance

db1.connect();
console.log('Same instance?', db1 === db2); // true
console.log('db2 connectionString:', db2.connectionString); // still first URI
