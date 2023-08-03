import {useState, useContext} from 'react'
import UserContext from "../contexts/User.context";
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const {user, setUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })

  
    const [isSignUp, setisSignUp] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange= (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const submitForm = async () => {
        let urlType= isSignUp ? "signup" : "login";
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
          
          console.log('Sending data:', formData);
            const response= await axios.post (
                `http://localhost:5005/auth/${urlType}`,
            formData
            );
      

        console.log('Received response:', response); 

      const authToken= response.data.authToken;
      localStorage.setItem("user", authToken);

      if( response.data.user){
        setUser(response.data.user);
      }

      setSuccessMessage(`Successfully ${isSignUp ? "signed up" : "logged in"}!!`);

    }catch (err) {
      console.log(err);
    
      setErrorMessage("Login/signup failed. Try again.")
    }
  }
    const handleSubmit= (e) => {
        e.preventDefault();
        submitForm();
    };

    return (
        <div>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
          </nav>
          <button onClick={() => setisSignUp(true)}>Sign Up</button>
          <button onClick={() => setisSignUp(false)}>Log In</button>
          {successMessage && <div className= "successMessage">{successMessage}</div>}
          {errorMessage && <div className="errorMessage"> {errorMessage}</div>}
          {isSignUp !== null && (
            <form onSubmit={handleSubmit}>
            <div>
              <label>
                Email: {" "}
                <input 
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} //
                />
              </label>
              <label>
                Password: {" "}
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <label>
                Name: {" "}
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">{isSignUp ? "Sign up" : "Login"} </button>
            </form>
          )}
        </div>
    );
}
