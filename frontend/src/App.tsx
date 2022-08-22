import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { Private } from './pages/Private/Private';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';

function App() {

    const auth = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
            </Routes>
        </div>
    )
}

export default App
