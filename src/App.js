import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { UserProvider } from "./contexts/User.context";
import Events from "./components/events/Events";

function App() {
  return (
    <div className="App">
      
      <UserProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<Events />} />
          </Routes>
      </UserProvider>
    
    </div>
  );
}

export default App;
