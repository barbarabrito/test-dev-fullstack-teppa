import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import './Navbar.css';

const Navbar = () => {
    
    const auth = useContext(AuthContext);

    const handleLogout = async () => {
        await auth.signout();
    };

    return (
        <>
            <nav>
                <div className="main-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {auth.authenticated &&
                        <li>
                            <Link to="/private">Dashboard</Link>
                        </li>}
                    </ul>
                </div>
                <div className="auth-nav">
                    <ul>
                        <li>
                            {auth.authenticated ? <button id="btn-logout" onClick={handleLogout}>Sair</button> :
                            <Link id="btn-login" to="/">Login</Link> }
                        </li>
                    </ul>
                </div>
            </nav>
            <hr id="hr-nav"/>
        </>
    );
};
export default Navbar;
