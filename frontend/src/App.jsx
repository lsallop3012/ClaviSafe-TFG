import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Create from './pages/Create.jsx';
import BoardDetail from './pages/BoardDetail.jsx';
import ImageDetail from './pages/ImageDetail.jsx';
import UserProfile from './pages/UserProfile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminImages from './pages/admin/AdminImages.jsx';
import AdminBoards from './pages/admin/AdminBoards.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import IndexRedirect from './components/IndexRedirect.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<IndexRedirect />} />
        <Route path="explore" element={<Explore />} />
        <Route path="boards/:id" element={<BoardDetail />} />
        <Route path="images/:id" element={<ImageDetail />} />
        <Route path="profile/:userId" element={<UserProfile />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="profile/edit/:userId" element={<EditProfile />} />
        </Route>

        <Route
          path="admin"
          element={
            <RoleRoute roles={['admin']}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="/admin/users" replace />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="images" element={<AdminImages />} />
          <Route path="boards" element={<AdminBoards />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
