import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiCall";
import { apiClient } from "../api/ApiClient";

// 1. Create a context
const AuthContext = createContext()

const useAuth = ()  => useContext(AuthContext)

// 2. Put some state in the context and share the context with other components

function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const[username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // Hardcoded authentication
    // function login(username, password){
    //     if (username === "harkiran" && password === "dummy"){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    async function login(username, password){
        const baToken = 'Basic ' + btoa(username + ":" + password)
        console.log(baToken);

        try {
            const response = await executeBasicAuthenticationService(baToken)

            if (response.status == 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting request and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch (error){
            console.log(error)
            logout()
            return false
        }
    
    }


    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthProvider, useAuth}