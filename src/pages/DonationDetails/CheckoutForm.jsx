import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import PropTypes from "prop-types";

const CheckoutForm = ({ amount, loadedData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  // const [price, setPrice] = useState(1);
  // console.log(price);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: amount })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setPrice(e.target.price.value);
    // console.log(price);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        // console.log(loadedData);
        ////now save the payment and details in db
        const payment = {
          paymentUser: user.email,
          donatedAmount: parseInt(amount),
          donationOwner: loadedData?.donationOwner,
          image: loadedData?.image,
          donationId: loadedData?._id,
          donationName: loadedData?.donationName,
        };
        // console.log(payment);
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res);
        const amountInfo = {
          donatedAmount: parseInt(loadedData?.donatedAmount) + parseInt(amount),
        };
        console.log("amountInfo--->", amountInfo);
        const response = await axiosSecure.patch(
          `/afterDonate/${loadedData._id}`,
          amountInfo
        );
        console.log("after patch", response.data);
      }
    }
  };

  return (
    <form className="border-4 p-4" onSubmit={handleSubmit}>
      <h2 className="my-10 text-center font-black ">
        Please Provide your card Number and click on pay
      </h2>
      {amount && (
        <h2 className="my-10 text-2xl text-center font-black ">
          Amount: ${amount}
        </h2>
      )}
      {/* <input className="border-4" type="number" name="price" id="" /> */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "28px",
              color: "#424770",
              border: "1px solid #9e2146",

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
      <button
        className="btn btn-sm btn-primary m-4 w-1/4 flex mx-auto"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">
          Success! Your Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
CheckoutForm.propTypes = {
  amount: PropTypes.number,
  loadedData: PropTypes.any,
};
