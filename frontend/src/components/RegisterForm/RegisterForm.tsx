import { useContext, useState } from "react";
import EmailInput from "./EmailInput";
import MessageForm from "./MessageForm";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi';
import {IoMdSend} from 'react-icons/io';

import './RegisterForm.css';
import { AuthContext } from "../../contexts/Auth/AuthContext";

const RegisterForm = () => {

    const auth = useContext(AuthContext);

    const [page, setPage] = useState(0);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [disableNext, setDisableNext] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const FormTitles = ["Name", "Email", "Password"];

    const PageDisplay = () => {
        if (page === 0) {
            return <NameInput formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext} />;
        } else if (page === 1) {
            return <EmailInput formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext} />;
        } else {
            return <PasswordInput formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext} />;
        }
    };

    const handleRegister = async () => {
        await auth.register(formData.name, formData.email, formData.password, formData.confirmPassword);
    }

    return (
        <div className="form-register">
            <div className="body">

                {showMessage ? <MessageForm /> : PageDisplay()}
            </div>
            {!showMessage &&
                <div>
                    <button
                        disabled={page == 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}
                    >
                        <BiLeftArrow/>
                    </button>
                    <button
                        disabled={disableNext == true}
                        onClick={() => {
                            if (page === FormTitles.length - 1) {
                                handleRegister();
                                setShowMessage(true);
                                console.log(formData);
                            } else {
                                setPage((currPage) => currPage + 1);
                            }
                        }}
                    >
                    {page === FormTitles.length - 1 ? <IoMdSend/> : <BiRightArrow/>}
                    </button>
                </div>
            }
        </div>
    )
}

export default RegisterForm;