import {useState, createContext, useContext} from "react";


const  LocationContext = createContext();

export const useLocation= () => {
  return useContext(LocationContext);
}

export const LocationProvider = ({ children}) => {
    const [locationData, setLocationData] = useState({ latitude: null, longitude: null});

  return (
    <LocationContext.Provider value= {{ locationData, setLocationData}} >
        {children}
    </LocationContext.Provider>
  );
};
