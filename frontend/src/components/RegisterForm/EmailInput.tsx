import { useEffect, useState } from "react";

const EmailInput = ({ formData, setFormData, setDisableNext }: any) => {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const [msg, setShowMessage] = useState('');

    useEffect(() => {
        if (!(emailRegex.test(formData.email)) || !formData.email) {
            setDisableNext(true)
            setShowMessage('*Formato de email: example@email.com')
        } else {
            setDisableNext(false)
        }
    }, [formData.email]);

    return (
        <div className="form-container-register">
            <div className="label-form">
                <label>Your email</label>
            </div>
            <br />
            <input
                type="text"
                value={formData.email}
                placeholder="email@exanple.com"
                onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                }
            />
            <div className="container-msg">
                <p><small>{msg}</small></p>
            </div>
        </div>
    )
}
export default EmailInput;