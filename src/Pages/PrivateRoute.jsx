import { Outlet, Navigate } from "react-router-dom";
import authService from "../features/authService";

const PrivateRoutes = () => {
  let user = authService.getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/login" />;

  //   return <Route {...rest}>{user ? children : <Navigate to="/login" />}</Route>;
};

export default PrivateRoutes;
