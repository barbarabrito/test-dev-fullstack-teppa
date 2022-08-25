import { useEffect, useState } from "react";

const PasswordInput = ({ formData, setFormData, setDisableNext }: any) => {

    const passwordRegex = /^\s+$/
    const [msg, setShowMessage] = useState('');

    useEffect(() => {
        if ((passwordRegex.test(formData.password)) || (passwordRegex.test(formData.confirmPassword))
        || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)) {

            setDisableNext(true);
            setShowMessage('*A senhas precisam coincidir')

        } else {
            setDisableNext(false)
        }
    }, [formData.password, formData.confirmPassword]);

    return (
        <div className="form-container-register">
            <div className="label-form">
                <label>Choose a password</label>
            </div>
            <input
                type="password"
                placeholder="Password..."
                value={formData.password}
                onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                }
            />
            <input
                type="password"
                placeholder="Confirm password..."
                value={formData.confirmPassword}
                onChange={(event) =>
                    setFormData({ ...formData, confirmPassword: event.target.value })
                }
            />
            <div className="container-msg">
                <p><small>{msg}</small></p>
            </div>
        </div>
    )
}
export default PasswordInput;