import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./contexts/User.context";
import { LocationProvider } from "./contexts/Location.context";
import Events from "./components/events/Events";
import EventDetails from "./components/events/EventDetails";
import CreateEvent from "./components/events/CreateEvent";


function App() {
  return (
    <div className="App">
      
      <UserProvider>
      <LocationProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createEvent" element = { <CreateEvent/> } />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
          </Routes>
          </LocationProvider>
      </UserProvider>
    
    </div>
  );
}

export default App;
