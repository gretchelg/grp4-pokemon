import "./App.css";
import Navigation from "./components/Navigation";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import Landingpage from "./components/Landingpage"
import Errorpage from "./components/Errorpage"
import { Routes, Route } from 'react-router';

function App() {
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
