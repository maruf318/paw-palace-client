import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import { AuthContext } from "../../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const DonationDetails = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);
  const [amount, setAmount] = useState(0);
  const difference = loadedData.maxAmount - loadedData.donatedAmount;
  // console.log(difference);

  const handleModal = (e) => {
    console.log(e.target.amount.value);
    setAmount(e.target.amount.value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle heading={"Donation Details"}></SectionTitle>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-full h-[70vh] object-cover"
            src={loadedData?.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className=" font-black text-center text-3xl italic">
            {loadedData?.donationName}
          </h2>
          <p className="text-lg font-normal">
            Max Donation/Target:{" "}
            <span className="font-black">${loadedData?.maxAmount}</span>
          </p>
          <p className="text-lg font-normal">
            Donation Received Till now:{" "}
            <span className="font-black">${loadedData?.donatedAmount}</span>
          </p>
          <p className="text-lg font-bold">
            About:{" "}
            <span className="text-sm text-gray-500 font-normal">
              {loadedData?.shortDescription}
            </span>
          </p>
          <p className="text-lg font-bold">
            Description :
            <span className="text-sm text-gray-500 font-normal">
              {loadedData?.description}
            </span>{" "}
          </p>
          {/* <form onSubmit={handleInputField}>
            <input type="number" name="value" id="" min={1} required />
            <input type="submit" value="submit" />
          </form> */}
          <div className="card-actions justify-end">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {loadedData.donatedAmount < loadedData.maxAmount ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Payment
              </button>
            ) : (
              <button className="btn btn-disabled"> Donation Complete</button>
            )}

            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Please Add Your Amount</h3>
                {/* <p className="py-4">
                  Press ESC key or click the button below to close
                </p> */}
                <div className="">
                  <form onSubmit={handleModal} method="dialog">
                    <div className="flex mx-auto justify-center my-6">
                      <label className="label">
                        <span className="label-text">Donation Amount: $</span>
                      </label>
                      <input
                        className="left-0 border-4 text-black w-full text-xl font-bold px-4"
                        min={1}
                        max={difference}
                        type="number"
                        name="amount"
                        id=""
                      />
                    </div>

                    {/* if there is a button in form, it will close the modal */}
                    <input
                      className="btn btn-secondary w-full"
                      type="submit"
                      value="Pay"
                    />
                    {/* <button className="btn">Close</button> */}
                  </form>
                </div>
              </div>
            </dialog>
            {/* <button className="btn btn-primary">Buy Now</button> */}
          </div>
        </div>
      </div>
      <div className="my-10 justify-center items-center mx-auto">
        {amount > 0 && (
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} loadedData={loadedData} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
