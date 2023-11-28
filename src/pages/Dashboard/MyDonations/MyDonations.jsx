import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: info = [], refetch } = useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  // console.log(info);

  const handleRefund = async (inf) => {
    console.log(inf);
    const refundAmount = {
      refundAmount: parseInt(inf.donatedAmount),
    };
    const res = await axiosSecure.patch(
      `/refund/${inf.donationId}`,
      refundAmount
    );
    // console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Donation is Refunded",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const resDel = await axiosSecure.delete(`/payments/${inf._id}`);
    console.log(resDel);
    refetch();
  };

  return (
    <div>
      <SectionTitle heading={"My donations"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Donated Amount</th>
              <th>Donation Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {info.map((inf, idx) => (
              <tr key={inf._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={inf.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>$ {inf.donatedAmount}</td>
                <td>{inf.donationName}</td>
                <th>
                  <button
                    onClick={() => handleRefund(inf)}
                    className="btn btn-primary btn-xs"
                  >
                    Refund
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

export default MyDonations;
