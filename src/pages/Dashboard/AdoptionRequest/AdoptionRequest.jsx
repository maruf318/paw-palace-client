import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: reqPet = [], refetch } = useQuery({
    queryKey: ["reqPet", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request/pets?email=${user.email}`);
      return res.data;
    },
  });
  console.log(reqPet);
  const handleApprove = (id) => {
    console.log(id);
    axiosSecure.patch(`/pet/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "adopted",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "pet Already adopted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`request/pets/${id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Request Rejected and deleted from database",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <h2>This is adoption request page</h2>
      {reqPet?.length ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Phone Num</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reqPet.map((p, index) => (
                <tr key={p._id}>
                  <th>{index + 1}</th>
                  <td>{p.reqUserName}</td>
                  <td>{p.requestAddress}</td>
                  <td>{p.requestPhone}</td>
                  <td>{p.requestEmail}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(p.petId)}
                      className="btn"
                    >
                      <TiTickOutline />
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="btn">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span>No User has requested for your Pet</span>
      )}
    </div>
  );
};

export default AdoptionRequest;
