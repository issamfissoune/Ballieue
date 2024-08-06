import {createContext,useContext, useState, useEffect} from "react";
import {getAllLocations, getAllUsers, getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [themeMode, setThemeMode] = useState("light");



    // get user, users, and locations and set them as a globalprovider
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res){
                    setIsLoggedIn(true);
                    setUser(res);
                }else{
                    setIsLoggedIn(false);
                    setUser(null);

                }
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=>{
                setIsLoading(false)
            })

        getAllUsers()
            .then((res) => {
                setUsers(res);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchLocations = async () => {
            try {
                const locationsData = await getAllLocations();
                setLocations(locationsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocations();



    }, []);







return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                locations,
                setLocations,
                users,
                setUsers,
                themeMode,
                setThemeMode,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider