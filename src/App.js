import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./contexts/User.context";
import { LocationProvider } from "./contexts/Location.context";
import Events from "./components/events/Events";
import EventDetails from "./components/events/EventDetails";
import CreateEvent from "./components/events/CreateEvent";
import EventsPage from "./pages/EventsPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <div className="App">
      
      <UserProvider>
      <LocationProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createEvent" element = { <CreateEvent/> } />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={ <EventDetails />} />
            <Route path="/users/:userId" element={ <UserProfilePage /> } />
          </Routes>
          </LocationProvider>
      </UserProvider>
    
    </div>
  );
}

export default App;
