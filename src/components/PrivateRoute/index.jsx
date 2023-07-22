import {
    Navigate,
    useLocation,
  } from 'react-router-dom';
  import {useContext} from "react";

  import {AuthContext} from "../../contexts/authContext";
  
  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    const currentLocation = useLocation();

    if (!token) {
      return <Navigate to="/home" replace state={{ from: currentLocation }} />;
    }
  
    return children;
  };

  export default PrivateRoute;