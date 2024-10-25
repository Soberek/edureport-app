import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export const ProtectedRoutesHOC = () => {
  const auth = useContext(AuthContext);

  return !auth.user ? <Navigate to={"/login"} replace /> : <Outlet />;
};
