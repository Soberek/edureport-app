import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export const ProtectedRoutesHOC = () => {
  const { is_authenticated } = useContext(AuthContext);

  return !is_authenticated ? <Navigate to={"/login"} replace /> : <Outlet />;
};
