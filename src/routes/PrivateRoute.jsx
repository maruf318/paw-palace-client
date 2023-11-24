import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  // const navigate = useNavigate(null);
  if (loading) {
    return (
      <span className="loading text-center flex justify-center h-[100vh] items-center mx-auto loading-spinner loading-lg"></span>
    );
  }
  if (!user) {
    return (
      <Navigate state={{ from: location }} to={"/login"} replace></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
