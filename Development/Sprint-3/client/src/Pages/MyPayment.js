import { useState } from 'react';
import { stripePromise , elements, CardElement } from "@stripe/react-stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import axios from "axios";


const OrderForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/paymentstripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount}),
    });

    const { clientSecret } = await response.json();
    const stripe = await stripePromise;

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      },
    });

    if (error) {
    console.log("idhar masla hai")
      console.log(error);
    } else {
      console.log('Payment succeeded!');
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default OrderForm;

