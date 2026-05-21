import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

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
