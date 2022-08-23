import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/shortcut-script-app.png'

import './Login.css';

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        if (email && password) {
            try {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    navigate("/private");
                    window.location.href = window.location.href;   
                } else {
                    alert("something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <div className="container-login">
            <div className="container-logo">
                <img src={Logo} alt="logo" id="logo"></img>
            </div>
            
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
            />
            <button onClick={handleLogin}>Logar</button>
            <a href="/register">Não possui uma conta? Cadastre-se</a>
        </div>
    );
};
