import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

/**
 * Wrap routes that should be visible only to certain roles.
 *
 *   <Route path="admin" element={<RoleRoute roles={['admin']}><AdminLayout /></RoleRoute>}>
 */
export default function RoleRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(user.role)) return <Navigate to="/home" replace />;
  return children;
}
