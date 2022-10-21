import { Navigate } from "react-router-dom";

export default function RedirectLanding() {
  return <Navigate to="/" replace={true} />;
}
