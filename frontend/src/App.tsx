import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { ToDo } from './pages/ToDo/ToDo';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';
import { WelcomeToApp } from './pages/WelcomeToApp/WelcomeToApp';

function App() {

    const auth = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/todo" element={<RequireAuth><ToDo/></RequireAuth>}/>
                <Route path="/welcome" element={<RequireAuth><WelcomeToApp/></RequireAuth>}/>
            </Routes>
        </div>
    )
}

export default App
