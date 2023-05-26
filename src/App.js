import "./App.css";
import Navigation from "./components/Navigation";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Registration />
      <Login />
      <Gallery />
      <Profile />
      <UserProfile />
    </div>
  );
}

export default App;
