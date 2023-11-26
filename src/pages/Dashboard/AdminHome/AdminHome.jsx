import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="space-y-4">
      <img className="w-24 h-24 rounded-lg" src={user.photoURL} alt="" />
      <h2 className="italic text-3xl">Personal Info: </h2>
      <h2 className=" font-bold text-2xl capitalize">
        Name: {user.displayName}
      </h2>
      <h2 className="text">Your email: {user.email}</h2>
    </div>
  );
};

export default AdminHome;
