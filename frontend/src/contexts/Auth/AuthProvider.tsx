import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            
            const storageData = localStorage.getItem('authToken');
            
            if (storageData) {
                const data = await api.validateToken(storageData);
                // console.log(storageData)
                if (data.user) {
                    setAuthenticated(true)
                    setUser(data.user)
                }
            }
        }
        validateToken();
    }, []);

    const signin = async(email: string, password: string) => {
        const data = await api.signin(email, password);
        
        if (data.user && data.token){
            
            setUser(data.user);
            console.log(data.user)
            setToken(data.token);
            console.log(data.token);
            return true;
        }
        return false;
    }

    const signout = async() => {
        await api.logout();
        setUser(null);
        setAuthenticated(false);
        setToken('');
    }

    const register = async (name:string, email:string, password:string, confirmPassword:string) => {
        await api.register(name, email, password, confirmPassword);
        
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
        // console.log(localStorage)
    }

    return (
        <AuthContext.Provider  value={{ user, authenticated, signin, signout, register }}>
            {children}
        </AuthContext.Provider>
    );
}