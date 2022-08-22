import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './Register.css';

const Register = () => {

    return (
        <div className="main-register">
            <div className="container-login">
                <RegisterForm/>     
            </div>
        </div>
    )
}
export default Register;