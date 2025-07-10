import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  // Admin dummy login
  const loginAsAdmin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  // Customer dummy login
  const loginAsCustomer = (username, password) => {
    if (username === "customer" && password === "cust123") {
      setIsCustomer(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsCustomer(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isCustomer, loginAsAdmin, loginAsCustomer, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
