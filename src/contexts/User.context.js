import { createContext, useEffect, useState } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("userInfo");
		return storedUser && storedUser!== "undefined" ? JSON.parse(storedUser) : null;
	})

	const updateUserProfile = (profileUpdates) => {
		const updatedUser = { ...user, ...profileUpdates};
		setUser(updatedUser)
		localStorage.setItem("userInfo", JSON.stringify(updatedUser));
	}

	useEffect(() => {
		if(user !== undefined) {
			localStorage.setItem("userInformation", JSON.stringify(user));
		}

	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser, updateUserProfile }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;