import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <progress className="progress w-48"></progress>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
AdminRoute.propTypes = {
  children: PropTypes.any,
};
