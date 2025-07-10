import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user object
  const [token, setToken] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  // Real login for customer
  const loginCustomer = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("customerUser", JSON.stringify(userData));
    localStorage.setItem("customerToken", jwtToken);
  };

  // Real logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("customerUser");
    localStorage.removeItem("customerToken");
    setLogoutSuccess(true);
  };

  // On mount, restore from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("customerUser");
    const storedToken = localStorage.getItem("customerToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isCustomer: !!user,
        loginCustomer,
        logout,
        logoutSuccess,
        setLogoutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
