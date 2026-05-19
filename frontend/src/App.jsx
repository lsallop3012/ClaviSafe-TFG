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
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<Create />} />
        <Route path="boards/:id" element={<BoardDetail />} />
        <Route path="images/:id" element={<ImageDetail />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/:userId" element={<UserProfile />} />
        <Route path="about" element={<AboutUs />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
