import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import userEvent from "@testing-library/user-event";
import { Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const CheckoutForm = ({ order }) => {
  const { user } = useContext(AuthContext);

  const { product_price, customer_email, _id, product_id } = order;
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const price = +product_price;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://motohub-alamin-merndev.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("moto_token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: customer_email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info in the database
      const payment = {
        price: price,
        email: customer_email,
        order_id: _id,
        transactionId: paymentIntent.id,
      };
      fetch("https://motohub-alamin-merndev.vercel.app/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            const update = {
              advertise: "false",
              status: "Sold",
            };
            fetch(
              `https://motohub-alamin-merndev.vercel.app/product/edit/${product_id}`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                  id: _id,
                  authorization: `bearer ${localStorage.getItem("moto_token")}`,
                },
                body: JSON.stringify(update),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                if (result.acknowledged) {
                  toast.success("Payment Success");
                  setSuccess("Congrats! your payment completed");
                  setTransactionId(paymentIntent.id);
                }
              })
              .catch((err) => console.error(err));
          }
        });
    }
    setProcessing(false);
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <Button
            className="btn btn-sm mt-4 btn-primary"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </Button>
        </form>
        <p className="text-red-500">{cardError}</p>
        {success && (
          <div className="py-3">
            <p className="text-green-500 font-bold">{success}</p>
            <p className="font-semibold">
              Your transactionId:{" "}
              <span className="font-normal   ">{transactionId}</span>
            </p>
          </div>
        )}
        <Toaster></Toaster>
      </>
    </div>
  );
};

export default CheckoutForm;
