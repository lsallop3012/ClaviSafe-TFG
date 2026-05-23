import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/paths';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import GuestRoute from './routes/GuestRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import About from './pages/About';
import Create from './pages/Create';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import Policies from './pages/Policies';
import Help from './pages/Help';
import PasswordReset from './pages/PasswordReset';
import NotFound from './pages/NotFound';
import AdminUsers from './pages/admin/AdminUsers';
import AdminImages from './pages/admin/AdminImages';
import AdminBoards from './pages/admin/AdminBoards';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Guest only (redirect to /explore if already logged in) */}
        <Route element={<GuestRoute />}>
          <Route path={ROUTES.HOME}           element={<Home />} />
          <Route path={ROUTES.LOGIN}          element={<Login />} />
          <Route path={ROUTES.SIGNUP}         element={<Signup />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
        </Route>

        {/* Public */}
        <Route path={ROUTES.EXPLORE}        element={<Explore />} />
        <Route path={ROUTES.ABOUT}          element={<About />} />
        <Route path={ROUTES.TERMS}          element={<Terms />} />
        <Route path={ROUTES.POLICIES}       element={<Policies />} />
        <Route path={ROUTES.HELP}           element={<Help />} />

        {/* Authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PROFILE}   element={<Profile />} />
          <Route path={ROUTES.CREATE}    element={<Create />} />
        </Route>

        {/* Admin only */}
        <Route element={<AdminRoute />}>
          <Route path={ROUTES.ADMIN_USERS}  element={<AdminUsers />} />
          <Route path={ROUTES.ADMIN_IMAGES} element={<AdminImages />} />
          <Route path={ROUTES.ADMIN_BOARDS} element={<AdminBoards />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
