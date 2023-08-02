import {useState, useContext} from 'react'
import UserContext from "../contexts/User.context";
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const {user, setUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [isSignUp, setisSignUp] = useState(null);

    const handleChange= (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const submitForm = async () => {
        let urlType= isSignUp ? "signup" : "login";
        let storedToken = localStorage.getItem("user");

        try {
          console.log({urlType})
            const data= await axios.post (
                `http://localhost:5005/auth/${urlType}`,
            formData,
            {
                // withCredentials: true,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            }
        );
        setUser(() => (isSignUp ? null : data ));
        } catch(error) {
            console.log(error)
        }
    };

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
                vale={formData.name}
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