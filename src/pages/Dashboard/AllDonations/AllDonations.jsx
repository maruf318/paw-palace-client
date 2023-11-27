import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useDonations from "../../../hooks/useDonations";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
const AllDonations = () => {
  const [donations, , refetch] = useDonations();
  const axiosSecure = useAxiosSecure();

  console.log(donations);
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

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-center">
        Total number of Donations: {donations.length}
      </h2>
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
            {donations.map((donation, index) => (
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
                  <button className="btn btn-secondary  btn-xs">
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonations;
