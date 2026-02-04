import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const contexts = useContext(AuthContext);

  if (!contexts) {
    throw new Error("Make sure to context within the auth provided");
  }

  return contexts;
};
