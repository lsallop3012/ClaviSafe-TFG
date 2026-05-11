import './styles/App.css';
import  './styles/Colors.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/pages/Home.jsx";
import Feed from "./components/pages/Feed.jsx";
import Create from "./components/pages/Create.jsx";
import UserProfile from "./components/pages/UserProfile.jsx";
import AboutUs from "./components/pages/AboutUs.jsx";
import Login from "./components/pages/Login.jsx";
import Admin from "./components/pages/Admin.jsx";
import AdminUsers from "./components/pages/AdminUsers.jsx";
import BigLayout from "./components/pages/BigLayout.jsx";
import AdminRoute from './components/pages/AdminRoute.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BigLayout />} >
          <Route index element={<Home />} />

          {/* RUTAS protegidas de la aplicacion web */}
          <Route
            path="Admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="AdminUsers"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          
          {/* Rutas de la aplicación web */}
          <Route path="home" element={<Home />} />
          <Route path="feed" element={<Feed />} />
          <Route path="create" element={<Create />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="login" element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
