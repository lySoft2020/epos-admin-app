import authService from "../features/authService";

export default function Logout() {
  authService.logout();
  window.location = "/login";

  return null;
}
