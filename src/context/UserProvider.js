import React, { useState, useEffect, useContext } from "react";
import profileAPI from '../shared/APICalls';

const userContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function UserProvider ({ children }) {
    const [ user, setUser ] = useState();
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const userData = await profileAPI.get('/users/me')
                setUser(userData.data)
                setLoaded(true)
            } catch (error) {
                setUser(null)
                setLoaded(true)
            }
        }
        getProfile()
    }, [setUser])

    return (
        <userContext.Provider value={{user, setUser, loaded}} >
            { children }
        </userContext.Provider>
    )
}

export default userContext;