import './styles/App.css';
import  './styles/Colors.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Create from "./pages/Create.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from "./pages/Login.jsx";
import BigLayout from "./pages/BigLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedRouteRol from "./components/ProtectedRouteRol.jsx";
import Explore from "./pages/Explore.jsx";
import Contact from "./pages/Contact.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminUser from "./pages/AdminUser.jsx";

import EditUser from "./crudUser/EditUser.jsx";
import CreateUser from "./crudUser/CreateUser.jsx";
import DeleteUser from "./crudImage/DeleteUser.jsx";
import CreateBoard from "./crudBoard/CreateBoard.jsx";
import EditBoard from "./crudBoard/EditBoard.jsx";
import DeleteBoard from "./crudImage/DeleteBoard.jsx";
import CreateImage from "./crudImage/CreateImage.jsx";
import EditImage from "./crudImage/EditImage.jsx";
import DeleteImage from "./crudImage/DeleteImage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><BigLayout /></ProtectedRoute>}>
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<Create />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="perfil-usuario" element={<UserProfile />} />
        <Route path="feed" element={<Feed />} />

        <Route element={<ProtectedRouteRol roles={[1]} />}>
          <Route path="usuarios-admin" element={<AdminUser />} />
          <Route path="usuarios-create" element={<CreateUser />} />
          <Route path="usuarios-edit/:id" element={<EditUser />} />
          <Route path="usuarios-delete/:id" element={<DeleteUser />} />

          <Route path="create-board" element={<CreateBoard />} />
          <Route path="edit-board/:id" element={<EditBoard />} />
          <Route path="delete-board/:id" element={<DeleteBoard />} />

          <Route path="create-image" element={<CreateImage />} />
          <Route path="edit-image/:id" element={<EditImage />} />
          <Route path="delete-image/:id" element={<DeleteImage />} />
        </Route>
        <Route element={<ProtectedRouteRol roles={[1, 2]} />}>
          <Route path="create-board" element={<CreateBoard />} />
          <Route path="create-image" element={<CreateImage />} />

          <Route path="edit-image/:id" element={<EditImage />} />
          <Route path="edit-board/:id" element={<EditBoard />} />
        </Route>

        <Route path="home" element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="create" element={<Create />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
