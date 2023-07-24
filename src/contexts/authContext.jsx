import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
);

const AuthContextProvider = ({ children }) => {
  const originLocation = useLocation();
  const navigate = useNavigate();

  const [token, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { token } }) => {
      setSession(token)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, token) => {
      setSession(token)
    })

    return () => subscription.unsubscribe()
  }, [])


  const handleLogin = async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    navigate(originLocation.state?.from?.pathname || "/movies");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
