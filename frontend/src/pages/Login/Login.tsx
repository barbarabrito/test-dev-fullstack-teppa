import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/to-do-list.png'

import './Login.css';

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMessage, setIsMessage] = useState(false);


    const Message = () => {
        return(
            <div className="msg-container">
                <p>Incorrect username or password</p>
            </div>
        )
    }

    const handleLogin = async () => {

        if (email && password) {
            try {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    navigate("/welcome");
                    window.location.href = window.location.href;   
                } else {
                    console.log("something went wrong");
                }
            } catch (error) {

                console.log(error);
                setIsMessage(true);

                setTimeout(() => {
                    setIsMessage(false);
                }, 3000)
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
            <a href="/register">Don't have an account? Sign-in</a>
            {isMessage && <Message/>}
        </div>
    );
};
