import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { User } from "../../types/User";

export const Private = () => {
    const auth = useContext(AuthContext);
    return(
        <div>
            <h3>Bem-vindo(a) {auth.user?.name}</h3>      
        </div>
    );
}