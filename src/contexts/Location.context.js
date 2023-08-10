import {useState, createContext, useContext} from "react";


const  LocationContext = createContext();

export const useLocation= () => {
  return useContext(LocationContext);
}

export const LocationProvider = ({ children}) => {
    const [locationData, setLocationData] = useState({ lat: null, lng: null});

  return (
    <LocationContext.Provider value= {{ locationData, setLocationData}} >
        {children}
    </LocationContext.Provider>
  );
};
