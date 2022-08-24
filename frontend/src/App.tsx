import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { ToDo } from './pages/ToDo/ToDo';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';
import { Profile } from './pages/Profile/Profile';

function App() {

    const auth = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/todo" element={<RequireAuth><ToDo/></RequireAuth>}/>
                <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
            </Routes>
        </div>
    )
}

export default App
