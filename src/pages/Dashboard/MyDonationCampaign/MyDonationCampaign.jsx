import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MyDonationCampaign = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  // console.log(user.email);
  const { data: myDonations = [], refetch } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    },
  });
  console.log(myDonations);

  /////////////
  const handleActiveButton = (id, active) => {
    const updateActive = !active;
    console.log(id, updateActive);
    const activeInfo = {
      active: updateActive,
    };

    ////////////////////////////////
    axiosSecure.patch(`/donation/${id}`, activeInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleView = async (id) => {
    console.log(id);
    // const donationInf = {
    //   donationId: id,
    // };
    const res = await axiosSecure.get(`/viewPayments/${id}`);
    console.log(res.data);
    setData(res.data);
  };
  console.log(data, typeof data);
  return (
    <div>
      <SectionTitle heading={"My Donation Campaign"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name & max donate</th>

              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myDonations.map((donation, index) => (
              <tr key={donation._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={donation.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {donation.donationName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {donation.maxAmount} $
                  </span>
                </td>
                <td>
                  <progress
                    className="progress progress-error w-56"
                    value={donation.donatedAmount}
                    max={donation.maxAmount}
                  ></progress>
                </td>
                <th>
                  {donation?.active ? (
                    <button
                      onClick={() =>
                        handleActiveButton(donation._id, donation.active)
                      }
                      className="btn btn-ghost btn-xs bg-red-200"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleActiveButton(donation._id, donation.active)
                      }
                      className="btn btn-ghost bg-green-200 btn-xs"
                    >
                      Active
                    </button>
                  )}

                  <Link to={`/dashboard/updateDonation/${donation?._id}`}>
                    <button className="btn btn-primary lg:mx-2 btn-xs">
                      Edit
                    </button>
                  </Link>
                  {/* <button
                    onClick={() => handleView(donation._id)}
                    className="btn btn-secondary  btn-xs"
                  >
                    View
                  </button> */}
                  <button
                    onClick={() => {
                      handleView(donation._id);
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="btn btn-secondary btn-xs"
                  >
                    View
                  </button>
                  {/*  */}
                  {/* <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    open modal
                  </button> */}
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">View Donations</h3>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                      </p>
                      <div className="">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <div className="overflow-x-auto">
                            <table className="table">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Email</th>
                                  <th>Donated Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {data?.map((a, idx) => (
                                  <tr key={a?._id}>
                                    <th>{idx + 1}</th>
                                    <td>{a?.paymentUser}</td>
                                    <td>{a?.donatedAmount}</td>
                                  </tr>
                                ))} */}
                                {data ? (
                                  data.map((a, idx) => (
                                    <tr key={a?._id || idx}>
                                      <th>{idx + 1}</th>
                                      <td>
                                        {a?.paymentUser || "no Data found"}
                                      </td>
                                      <td>
                                        {a?.donatedAmount || "no Data found"}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="3">No data available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <button className="btn btn-primary">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  {/*  */}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationCampaign;
