import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loader from "../components/ui/Loader";

function ProtectedRoute({ children }) {
  const {
    user,

    loading,
  } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
