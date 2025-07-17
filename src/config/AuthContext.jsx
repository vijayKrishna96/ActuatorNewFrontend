import { useEffect, useState } from "react";
import { createContext } from "react";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user , setUser] = useState(null);
    const [token , setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if(token){
            fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CHECK_TOKEN}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
        }
    }, [token]);

    const login = async (email , password) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email , password})
        })

        if(res.ok){
            const data = await res.json();
            localStorage.setItem("token" , data.token);
            setToken(data.token);
            setUser(data.user);
            return data;
        }
        return false;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{ user , token , login , logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export { AuthProvider, AuthContext };