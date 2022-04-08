import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../utils/firebase";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const onChangeUser = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });
    return () => onChangeUser();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
