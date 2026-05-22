import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/** "/" lands here: authed users go home, guests go to explore. */
export default function IndexRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return <Navigate to={user ? '/home' : '/explore'} replace />;
}
