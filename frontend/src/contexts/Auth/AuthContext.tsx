import { createContext } from 'react';
import { User } from '../../types/User';

export type AuthContextType = {
    user: User | null;
    authenticated : (boolean)
    signin: (email: string, password: string) => Promise<boolean>; 
    signout: () => void; 
    register: (name:string, email:string, password:string, confirmPassword:string) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);