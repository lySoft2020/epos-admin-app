import authService from "../features/authService";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  authService.logout();
  navigate("/login");
  // window.location = "/login";

  return null;
}
