import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>Welcome {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default AdminHome;
