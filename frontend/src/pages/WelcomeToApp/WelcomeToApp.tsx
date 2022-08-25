import { Login } from '../Login/Login';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './WelcomeToApp.css';

export const WelcomeToApp = () => {

    const auth = useContext(AuthContext);

    const Welcome = () => {
        return(
            <div className="container-welcome">
                <h1>Welcome {auth.user?.name}</h1>
                <br/>
                <Link to="/todo"><h2>Go to todo's list page</h2></Link>
            </div>
        )
    }
    
    return (
        <div className="main-container">
            {!auth.user ?  <Login /> : <Welcome/>}
        </div>
    );
}