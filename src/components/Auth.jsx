import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
const Auth = ({ children }) => {
  const { online } = useContext(UserContext);

  if (!online) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;
