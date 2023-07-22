import { useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const originLocation = useLocation();
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const handleLogin = async (token) => {
    navigate(originLocation.state?.from?.pathname || "/movies");
    saveToken(token);
  };

  const handleLogout = async () => {
    navigate("/login");
    sessionStorage.clear();
    window.location.reload(false);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
