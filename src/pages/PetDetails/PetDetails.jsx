import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PetDetails = () => {
  const axiosSecure = useAxiosSecure();
  const pet = useLoaderData();
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    const reqUserName = e.target?.name?.value;
    const requestEmail = e.target?.email?.value;
    const requestPhone = e.target?.phone?.value;
    const requestAddress = e.target?.address?.value;
    const petOwner = pet?.petOwner;
    const petId = pet?._id;
    if (requestEmail == petOwner) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your cant request for your own pet",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    const reqInfo = {
      reqUserName: reqUserName,
      requestEmail: requestEmail,
      requestPhone: requestPhone,
      requestAddress: requestAddress,
      petOwner: petOwner,
      petId: petId,
    };
    console.log(reqInfo);
    const petRes = await axiosSecure.post("/request/pets", reqInfo);
    console.log(petRes.data);
    if (petRes.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pet request has been made",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(pet);
  return (
    <div className="max-w-7xl mx-auto">
      <h2>Pet details page</h2>
      <div className=" lg:card-side bg-base-100 shadow-xl my-10">
        <figure className="lg:w-full">
          <img className="lg:h-[70vh]" src={pet.image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name: <span>{pet.name}</span>
          </h2>
          <p>
            location: <span>{pet.location}</span>
          </p>
          <p>
            Pet post created: <span>{pet.date}</span>
          </p>
          <p>
            category: <span>{pet.category}</span>
          </p>
          <p>
            Pet owner email: <span>{pet.petOwner}</span>
          </p>
          <p>
            Note from Owner: <span>{pet.note}</span>
          </p>
          <p>
            Description: <span>{pet.description}</span>
          </p>
          <div className="card-actions justify-center  m-4">
            {/* <button className="btn btn-primary">Adopt Pet</button> */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Request for Adopt
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="flex flex-col items-center justify-center">
                  <form onSubmit={handleSubmit} method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <div>
                      <label
                        // for="first_name"
                        className="block mb-2 text-sm font-medium text-pink-600  dark:text-white"
                      >
                        User Name
                      </label>
                      <input
                        className=" text-2xl mr-2 bg-gray-400 text-white p-2 rounded-lg "
                        type="text"
                        name="name"
                        value={user.displayName}
                        readOnly
                        id=""
                        required

                        // value={getDate()}
                      />
                    </div>
                    <div>
                      <label
                        // for="first_name"
                        className="block mb-2 text-sm font-medium text-pink-600  dark:text-white"
                      >
                        User email
                      </label>
                      <input
                        className=" text-2xl mr-2 bg-gray-400 text-white p-2 rounded-lg "
                        type="email"
                        name="email"
                        value={user.email}
                        readOnly
                        id=""
                        required
                        // value={getDate()}
                      />
                    </div>
                    <div>
                      <label
                        // for="first_name"
                        className="block mb-2 text-sm font-medium text-pink-600  dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        className=" text-2xl mr-2 bg-secondary text-white p-2 rounded-lg "
                        type="text"
                        name="address"
                        id=""
                        required
                        // value={getDate()}
                      />
                    </div>
                    <div>
                      <label
                        // for="first_name"
                        className="block mb-2 text-sm font-medium text-pink-600  dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        className=" text-2xl mr-2 bg-secondary text-white p-2 rounded-lg "
                        type="number"
                        name="phone"
                        id=""
                        required
                        // value={getDate()}
                      />
                    </div>
                    {/* <button className="btn">Close</button> */}
                    <input
                      className="btn bg-primary justify-center mx-auto flex "
                      type="submit"
                      value="Submit"
                    />
                    {/* <input type="submit" value="" /> */}
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
