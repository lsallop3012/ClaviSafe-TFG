import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TOKEN_VERIFY_ENDPOINT } from "../../endpoints";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(TOKEN_VERIFY_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.ok) {
          setAuth(true);
        } else {
          setAuth(false);
          localStorage.removeItem("token"); 
        }
      } catch (err) {
        setAuth(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, [token]);

  if (loading) return <h1>Loading...</h1>;

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;