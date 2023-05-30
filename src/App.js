import "./App.css";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Navigation from "./components/Navigation";
import Landingpage from "./components/Landingpage";
import Errorpage from "./components/Errorpage";

function App() {
  const { isLoggedIn } = useContext(DataContext);
  return (
    <div className="App">
      <Navigation />

      {/* SETUP ROUTES AND PATHS    */}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/oops" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}

export default App;
