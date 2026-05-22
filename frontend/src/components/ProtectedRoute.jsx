<<<<<<< HEAD

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
=======
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TOKEN_VERIFY_ENDPOINT } from "../../endpoints";
=======
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children ?? <Outlet />;
}
<<<<<<< HEAD

export default ProtectedRoute;
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
