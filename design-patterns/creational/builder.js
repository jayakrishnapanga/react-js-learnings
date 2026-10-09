/**
 * BUILDER — Construct complex objects step by step.
 *
 * Interview: "How do you build complex MongoDB queries or email payloads?"
 * Answer: Fluent builder API — chain methods, call build() at the end.
 *
 * Trade-offs:
 *   + Readable construction of objects with many optional fields
 *   - Extra classes; overkill for simple objects
 */

class EmailBuilder {
  constructor() {
    this.email = { to: [], cc: [], attachments: [], headers: {} };
  }

  to(address) {
    this.email.to.push(address);
    return this;
  }

  subject(text) {
    this.email.subject = text;
    return this;
  }

  body(html) {
    this.email.html = html;
    return this;
  }

  cc(address) {
    this.email.cc.push(address);
    return this;
  }

  attachment(file) {
    this.email.attachments.push(file);
    return this;
  }

  build() {
    if (!this.email.to.length) throw new Error('Recipient required');
    if (!this.email.subject) throw new Error('Subject required');
    return { ...this.email };
  }
}

// Mongoose query builder is the same idea:
// User.find({ active: true }).select('name email').sort('-createdAt').limit(10)

class UserQueryBuilder {
  constructor(model) {
    this.query = model.find();
  }

  activeOnly() {
    this.query = this.query.where({ active: true });
    return this;
  }

  withFields(...fields) {
    this.query = this.query.select(fields.join(' '));
    return this;
  }

  paginate(page, limit) {
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }

  exec() {
    return this.query;
  }
}

// --- Demo ---
const welcomeEmail = new EmailBuilder()
  .to('user@example.com')
  .subject('Welcome!')
  .body('<h1>Thanks for signing up</h1>')
  .build();

console.log('Built email:', welcomeEmail);
