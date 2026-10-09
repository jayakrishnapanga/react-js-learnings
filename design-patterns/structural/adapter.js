/**
 * ADAPTER — Wrap an incompatible interface so clients can use it.
 *
 * Interview: "How do you integrate a third-party API with a different response shape?"
 * Answer: Adapter normalizes external data to your internal format.
 *
 * Trade-offs:
 *   + Integrate legacy or third-party code without changing your domain
 *   - Extra layer; can hide useful features of the wrapped API
 */

// Your app's expected user shape
// { id, fullName, email, avatarUrl }

// Stripe returns a different shape
const stripeCustomer = {
  id: 'cus_abc123',
  name: 'Jane Doe',
  email: 'jane@stripe.com',
  metadata: { avatar: 'https://cdn.example.com/jane.jpg' },
};

// PayPal returns yet another shape
const paypalUser = {
  payer_id: 'PAYPAL-789',
  given_name: 'John',
  surname: 'Smith',
  email_address: 'john@paypal.com',
  picture: 'https://paypal.com/pic/john.jpg',
};

class StripeUserAdapter {
  constructor(stripeCustomer) {
    this.customer = stripeCustomer;
  }

  toAppUser() {
    return {
      id: this.customer.id,
      fullName: this.customer.name,
      email: this.customer.email,
      avatarUrl: this.customer.metadata?.avatar ?? null,
    };
  }
}

class PayPalUserAdapter {
  constructor(paypalUser) {
    this.user = paypalUser;
  }

  toAppUser() {
    return {
      id: this.user.payer_id,
      fullName: `${this.user.given_name} ${this.user.surname}`,
      email: this.user.email_address,
      avatarUrl: this.user.picture ?? null,
    };
  }
}

// Client code only knows AppUser — doesn't care about provider
function renderUserProfile(appUser) {
  console.log(`Profile: ${appUser.fullName} (${appUser.email})`);
}

// --- Demo ---
renderUserProfile(new StripeUserAdapter(stripeCustomer).toAppUser());
renderUserProfile(new PayPalUserAdapter(paypalUser).toAppUser());
