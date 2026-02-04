import { createContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/user.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    setUser(response.data);
    return response.data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
