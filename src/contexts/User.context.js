import { createContext, useEffect, useState } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser && storedUser!== "undefined" ? JSON.parse(storedUser) : null;
	})

	useEffect(() => {
		if(user !== undefined) {
			localStorage.setItem("user", JSON.stringify(user));
		}

	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;