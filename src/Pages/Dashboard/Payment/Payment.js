import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const order = useLoaderData();
  const { product_name, product_price } = order[0];
  return (
    <div className="w-96 pt-5 pb-12  container mx-auto">
      <div className="pb-5">
        <h3 className="text-3xl">Payment for {product_name}</h3>
        <p className="text-xl py-2">
          Please pay <strong>${product_price}</strong> for your {product_name}
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order[0]} />
      </Elements>
    </div>
  );
};

export default Payment;
