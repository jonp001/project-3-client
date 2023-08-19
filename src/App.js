import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./contexts/User.context";
import { LocationProvider } from "./contexts/Location.context";
import EditEvent from "./components/events/EditEvent";
import CreateEvent from "./components/events/CreateEvent";
import EventsPage from "./pages/EventsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ChooseLocation from "./components/locations/ChooseLocation";
import EditLocation from "./components/locations/EditLocation";
import CreateEventPage from "../src/pages/CreateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";


function App() {
  return (
    <div className="App">
      
      <UserProvider>
      <LocationProvider>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createEvent" element = { <CreateEvent/> } />
            <Route path="/chooseLocation/:eventId" element = { <ChooseLocation/> } />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={ <EventDetailsPage />} />
            <Route path="/events/edit-event/:eventId" element={<EditEvent />} />
            <Route path="/editLocation/:locationId" element = {<EditLocation />}/>
            <Route path="/users/:userId" element={ <UserProfilePage /> } />
            <Route path="/events/createEvent" element={ <CreateEventPage />} />
          </Routes>
          </LocationProvider>
      </UserProvider>
    
    </div>
  );
}

export default App;
