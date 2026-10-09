/**
 * FACTORY — Create objects without specifying the exact class.
 *
 * Interview: "How do you support multiple payment providers?"
 * Answer: Factory returns StripePayment or PayPalPayment based on config/user choice.
 *
 * Trade-offs:
 *   + Open for extension (add new types without changing client code)
 *   - Can grow into a god-factory if you have too many types
 */

class StripePayment {
  charge(amount) {
    console.log(`Stripe: charged $${amount}`);
    return { success: true, provider: 'stripe' };
  }
}

class PayPalPayment {
  charge(amount) {
    console.log(`PayPal: charged $${amount}`);
    return { success: true, provider: 'paypal' };
  }
}

class RazorpayPayment {
  charge(amount) {
    console.log(`Razorpay: charged ₹${amount}`);
    return { success: true, provider: 'razorpay' };
  }
}

// Simple Factory
function createPaymentProcessor(provider) {
  const processors = {
    stripe: StripePayment,
    paypal: PayPalPayment,
    razorpay: RazorpayPayment,
  };

  const Processor = processors[provider];
  if (!Processor) throw new Error(`Unknown payment provider: ${provider}`);
  return new Processor();
}

// Express-style usage
function checkout(req, res) {
  const { amount, provider } = req.body;
  const payment = createPaymentProcessor(provider);
  const result = payment.charge(amount);
  res.json(result);
}

// --- Demo ---
const stripe = createPaymentProcessor('stripe');
const paypal = createPaymentProcessor('paypal');

stripe.charge(99);
paypal.charge(49);

// Mongoose does this too: mongoose.model('User', schema) → factory for models
