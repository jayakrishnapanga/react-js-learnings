# Design Patterns for MERN Stack Interviews

A practical guide for full-stack developers. Every pattern includes **what interviewers ask**, **when to use it**, and **MERN-specific examples**.

---

## How to Use This Repo

1. Read one pattern per day (15–20 min)
2. Run the code: `node <file-path>`
3. For each pattern, practice saying aloud: *"I've used this when..."*
4. Connect each pattern to something you've built (even loosely)

---

## Interview Reality Check

| What they ask | What they actually want |
|---|---|
| "Explain the Observer pattern" | Can you connect it to EventEmitter, WebSockets, or React state? |
| "Singleton vs Factory?" | Do you know trade-offs (testing, globals, DI)? |
| "Design a notification system" | Can you pick Observer + Strategy without naming every pattern? |
| "How would you structure a Node API?" | MVC, Service layer, Repository — they want clean separation |

**You don't need all 23 GoF patterns.** Focus on the **12 below** — they cover ~90% of full-stack interviews.

---

## The 12 Patterns That Matter for MERN

### Creational (how objects are created)

| Pattern | One-liner | MERN touchpoint |
|---|---|---|
| [Singleton](./creational/singleton.js) | One instance, shared globally | DB connection pool, config, logger |
| [Factory](./creational/factory.js) | Create objects without specifying exact class | Payment providers, auth strategies |
| [Builder](./creational/builder.js) | Step-by-step complex object construction | Query builders (Mongoose), email templates |

### Structural (how things are composed)

| Pattern | One-liner | MERN touchpoint |
|---|---|---|
| [Adapter](./structural/adapter.js) | Wrap incompatible interface | Third-party API wrappers (Stripe, SendGrid) |
| [Decorator](./structural/decorator.js) | Add behavior without modifying original | Express middleware, React HOCs |
| [Facade](./structural/facade.js) | Simple interface over complex subsystem | Service layer hiding DB + cache + queue |

### Behavioral (how objects communicate)

| Pattern | One-liner | MERN touchpoint |
|---|---|---|
| [Observer](./behavioral/observer.js) | Notify subscribers on change | EventEmitter, WebSockets, Redux |
| [Strategy](./behavioral/strategy.js) | Swap algorithms at runtime | Auth (JWT vs OAuth), sorting, pricing rules |
| [Command](./behavioral/command.js) | Encapsulate action as object | Undo/redo, job queues (Bull), audit logs |
| [Chain of Responsibility](./behavioral/chain-of-responsibility.js) | Pass request along a chain | Express middleware pipeline |
| [State](./behavioral/state.js) | Object behavior changes with internal state | Order status, form wizards, game states |
| [Module](./behavioral/module-pattern.js) | Encapsulate private state (JS idiom) | Node modules, IIFE, closure-based APIs |

### Full-Stack Architecture (often asked as "system design lite")

| Pattern | MERN touchpoint |
|---|---|
| [MVC + Service Layer](./fullstack/mvc-service-layer.js) | Express routes → controllers → services → models |
| [Repository](./fullstack/repository.js) | Abstract DB access; swap Mongo for Postgres in tests |
| [Circuit Breaker](./fullstack/circuit-breaker.js) | Fail fast when Stripe/Redis/microservice is down |
| [Saga](./fullstack/saga.js) | Order + payment + inventory across services with rollback |

### DB Optimization (transactions, races, locks)

Interviewers often jump from "design the API" to **"what if two requests hit at once?"** These three files are the vocabulary.

| Topic | One-liner | MERN touchpoint |
|---|---|---|
| [Transactions](./db-optimization/transactions.js) | All writes commit together or none do (ACID + isolation) | Wallet transfer, Mongo multi-doc sessions |
| [Concurrency](./db-optimization/concurrency.js) | Lost updates, overselling, optimistic version checks | Last ticket, `$inc` / `WHERE stock >= 1` |
| [Locking](./db-optimization/locking.js) | Pessimistic locks, deadlocks, lock order | `SELECT FOR UPDATE`, Redis mutex, retry victim |

**Read them in order:** transactions → concurrency → locking.

---

## MERN Stack Mapping Cheat Sheet

```
React                          Node/Express                    MongoDB
─────────────────────────────────────────────────────────────────────────
HOC / Wrapper       → Decorator
Context + useReducer → Observer + State
Custom hooks        → Strategy / Composition
Compound components → Facade (simple API, complex internals)
Container/Presentational → MVC separation

Express middleware  → Chain of Responsibility + Decorator
Router + Controller → MVC
Service classes     → Facade + Strategy
mongoose.model()    → Factory + Singleton (connection)
EventEmitter        → Observer
Bull/BullMQ jobs    → Command
Repository layer    → Adapter + Facade
Circuit Breaker     → opossum library, axios interceptors
Saga orchestration  → Bull job chains, Step Functions
Saga choreography   → Kafka/RabbitMQ events between services
```

---

## How to Answer "Explain Pattern X" in Interviews

Use this 4-step template (30–60 seconds):

1. **Definition** — one sentence
2. **Problem it solves** — why not just inline code?
3. **MERN example** — concrete, from your stack
4. **Trade-off** — when NOT to use it

**Example (Observer):**

> "Observer defines a one-to-many dependency — when one object changes, all dependents are notified automatically. I'd use it when multiple parts of the app need to react to the same event, like a real-time chat where new messages update the UI, unread count, and notification badge. In Node I use EventEmitter; in React, Context or a state library. The trade-off is debugging — event chains can become hard to trace if overused."

---

## Common Interview Questions + Pattern Answers

### "Design a payment system supporting Stripe and PayPal"

→ **Strategy** (swap payment processor) + **Factory** (create the right processor) + **Adapter** (normalize different APIs)

### "How do you structure a REST API?"

→ **MVC** (routes/controllers/models) + **Service layer** (Facade) + **Repository** (data access) + **Middleware chain** (auth, validation, logging)

### "How would you add caching without changing business logic?"

→ **Decorator** (wrap service with cache layer) or **Proxy**

### "Design a notification system (email, SMS, push)"

→ **Observer** (event triggers notifications) + **Strategy** (channel selection) + **Factory** (create channel handlers)

### "How do you handle order lifecycle (pending → paid → shipped → delivered)?"

→ **State** pattern — each state class handles allowed transitions and actions

### "Stripe is down — how do you prevent your app from crashing?"

→ **Circuit Breaker** — after N failures, stop calling Stripe and return fallback/queued response

### "Order needs payment + inventory + email — one step fails, how do you rollback?"

→ **Saga** — compensating transactions: refund payment, release inventory, cancel order

### "Two users buy the last item — how do you not oversell?"

→ **Atomic update** (`UPDATE ... WHERE stock >= 1` or Mongo `findOneAndUpdate` + `$inc`) or **optimistic version** + retry. For a hot wallet: **pessimistic** `SELECT FOR UPDATE`. See [concurrency](./db-optimization/concurrency.js) and [locking](./db-optimization/locking.js).

### "Debit account A, credit B — process dies in the middle?"

→ **Transaction** (BEGIN/COMMIT/ROLLBACK). Single Mongo document is already atomic; two documents need a session. Across *services*, use **Saga**, not one giant DB transaction.

---

## Patterns You Can Skip (Unless Senior/Architect Role)

- **Abstract Factory** — rarely needed in JS (duck typing)
- **Bridge, Composite, Flyweight** — more common in Java/C# interviews
- **Interpreter, Memento, Visitor** — niche; know the name only
- **Prototype** — JS objects clone natively; know concept, skip deep implementation

---

## 2-Week Study Plan

| Day | Focus | Action |
|---|---|---|
| 1–2 | Singleton, Factory, Module | Run creational examples; explain DB connection singleton |
| 3–4 | Observer, Strategy | Connect to EventEmitter + auth providers |
| 5–6 | Decorator, Chain of Responsibility | Trace an Express middleware stack on paper |
| 7–8 | Facade, Adapter, Repository | Sketch your ideal API layer structure |
| 9–10 | Command, State, Builder | Design order flow + job queue verbally |
| 11–12 | MVC + Service layer, Circuit Breaker | Refactor a messy route file; explain Stripe outage handling |
| 13–14 | Saga + Mock interviews | Trace order rollback; answer "design checkout flow" out loud |
| 15–16 | Transactions, concurrency, locking | Run the three `db-optimization` files; explain oversell + deadlock retry |

---

## SOLID Principles

Full runnable guide: [solid/solid-principles.js](./solid/solid-principles.js)

| Principle | One-liner | MERN example | Violation looks like |
|---|---|---|---|
| **S** — Single Responsibility | One class, one reason to change | Controller → Service → Repository (each layer one job) | 200-line route handler doing validation + DB + email |
| **O** — Open/Closed | Extend without modifying existing code | Add new payment provider as new class, not new `if/else` | Editing `checkout.js` every time you add Stripe/PayPal/Razorpay |
| **L** — Liskov Substitution | Subtypes must be swappable | Any `PaymentProcessor` passed to checkout must actually work | `MockPayment` that throws "not implemented" in prod code path |
| **I** — Interface Segregation | Don't force unused methods | Split `ReadableRepo` vs `WritableRepo`; analytics only reads | Fat interface with `uploadFile()` on a Mongo repo |
| **D** — Dependency Inversion | Depend on abstractions, inject concretions | Pass repo/payment into service constructor; mock in tests | `new StripeClient()` hardcoded inside service class |

### How to answer "Explain SOLID" in interviews

Pick **2 principles** and go deep rather than listing all 5 shallowly:

> "**SRP** — in my Express APIs I keep controllers thin: they parse HTTP, call a service, return JSON. Business logic lives in services, DB access in repositories. If our email template changes, only `EmailService` changes.
>
> **DIP** — services receive dependencies via constructor, not `new Stripe()` inside the class. In tests I inject mocks; in production I wire real implementations in `app.js`. Same idea as React props vs importing globals."

### SOLID ↔ Design Patterns

| SOLID | Related patterns |
|---|---|
| **S**ingle Responsibility | Service layer, Repository, Facade |
| **O**pen/Closed | Strategy, Decorator, Factory |
| **L**iskov Substitution | Strategy implementations must be interchangeable |
| **I**nterface Segregation | Small focused interfaces (Repository) |
| **D**ependency Inversion | Inject Strategy/Repository; don't `new` inside services |

### Common interview follow-ups

| Question | Answer |
|---|---|
| "SRP vs separation of concerns?" | SRP is about **one reason to change** per module; SoC is broader layering (UI vs logic vs data) |
| "Does OCP mean never edit code?" | No — fix bugs in place. OCP means **extend behavior** via new classes/modules, not endless if/else |
| "How do you apply DIP in Express?" | Factory in `app.js`: `const orderService = new OrderService(repo, payment, email)` |
| "SOLID in React?" | S=one component one job; O=compose HOCs/wrappers; D=pass callbacks/data as props, avoid global imports |

---

## Quick Reference: SOLID ↔ Patterns

See [SOLID Principles](#solid-principles) section above.

---

## Run Examples

```bash
node creational/singleton.js
node creational/factory.js
node behavioral/observer.js
node fullstack/mvc-service-layer.js
node solid/solid-principles.js
node db-optimization/transactions.js
node db-optimization/concurrency.js
node db-optimization/locking.js
# ... etc
```

Each file is self-contained with comments and a `// --- Demo ---` section at the bottom.
