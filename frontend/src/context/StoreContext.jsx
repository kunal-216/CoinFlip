import React , {createContext, useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";

const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const url = import.meta.env.VITE_API_URI;

    const [profileData, setProfileData] = useState(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  
        if (response.data.success) {
          setProfileData(response.data.data);
        } else {
          toast.error('Failed to fetch the profile data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching the profile data.');
      }
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
        if (token) {
            fetchData();
          }
    }, [token])

    return (
        <StoreContext.Provider value={{token, setToken, url, profileData, setProfileData}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useContextProvider = () => useContext(StoreContext);