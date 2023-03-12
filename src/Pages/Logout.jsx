import authService from "../features/authService";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  authService.logout();

  window.location = "/login";

  return null;
}
