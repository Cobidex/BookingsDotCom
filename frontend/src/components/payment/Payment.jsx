import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async (token) => {
    try {
      const response = await axios.post('http://localhost:5000/users/payment', { token });

      // Handle successful payment
      console.log('Payment successful:', response.data);

      // Set success state to display a success message to the user
      setSuccess(true);
      setError('');
    } catch (error) {
      // Handle payment error
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      {error && <p>{error}</p>}
      {success && <p>Payment successful!</p>}
      <StripeCheckout
        token={handlePayment}
        stripeKey="YOUR_STRIPE_PUBLISHABLE_KEY"
        amount={1000} // Amount in cents (e.g., $10 = 1000 cents)
        currency="USD"
        name="Your App"
      >
        <button>Make Payment</button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
