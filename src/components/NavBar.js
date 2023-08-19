import {useState, useContext} from 'react'
import UserContext from "../contexts/User.context";
import axios from "axios";
import { NavLink } from 'react-router-dom';
const API_URL= process.env.REACT_APP_API_URL || "http://localhost:5005";


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
                `${API_URL}/auth/${urlType}`,
            formData, { withCredentials: true }
            );
      

        console.log('Received response:', response); 

      const authToken= response.data.authToken;
      localStorage.setItem("authToken", authToken);

      if( response.data.user){
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        setUser(response.data.user);
      }

      setSuccessMessage(`Successfully ${isSignUp ? "signed up" : "logged in"}!!`);
      setisSignUp(null);

    }catch (err) {
      console.log(err);
    
      setErrorMessage("Login/signup failed. Try again.")
    }
  }
    const handleSubmit= (e) => {
        e.preventDefault();
        submitForm();
    };

    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
    };

    return (
        <div>
          <nav className='navbar'>
          <div className="logo-left"></div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <div className="logo-right"></div>
            {user &&(
              <div>
              <span> Hello, {user.name} </span>
              <NavLink to={`/users/${user._id}`}> Profile </NavLink>
              </div>
              )}
          </nav>
          {user ? (
            <button className='logout-button' onClick={handleLogout}>Logout </button>
          ): (
            <div className='auth-buttons'>
          <button onClick={() => setisSignUp(true)}>Sign Up</button>
         
          <button onClick={() => setisSignUp(false)}>Log In</button>
            </div>
            
          )}

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
              {isSignUp && (
              <label>
                Name: {" "}
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
              </label>
              )}
              
            </div>
            <button type="submit">{isSignUp ? "Sign up" : "Login"} </button>
            </form>
          )}
        </div>
    );
}
