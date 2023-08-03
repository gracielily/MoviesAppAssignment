import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);
import { createClient } from "@supabase/supabase-js";

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

  const handleSignup = async ({ username, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });
    if(!error) {
      navigate("/login");
      } else {
        return error
      }
    
  };


  const handleLogin = async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if(!error) {
    navigate(originLocation.state?.from?.pathname || "/");
    } else {
      return error
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup: handleSignup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
