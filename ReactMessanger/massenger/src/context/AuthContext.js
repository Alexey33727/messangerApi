import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        // axios.defaults.mode = 'no-cors'
        axios.post(process.env.REACT_APP_API_ADRES + 'jwt/refresh/', {
            "refresh": localStorage.getItem('refresh')
        }).then(res => {
            axios.get(process.env.REACT_APP_API_ADRES + 'api/v1/login', {
                headers: {
                    Authorization: "Bearer" + " " + res.data.access,
                }
            }).then(res => {
                setCurrentUser(res.data)
            })
        }).catch(err => {
            navigate('/login')
        })
    }, [localStorage.getItem('refresh')])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}