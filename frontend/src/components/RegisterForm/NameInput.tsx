import { useEffect, useState } from "react";

const NameInput = ({ formData, setFormData, disableNext, setDisableNext }: any) => {

    const nameRegex = /^\s+$/
    const [msg, setShowMessage] = useState('');

    useEffect(() => {
        if ((nameRegex.test(formData.name)) || !formData.name) {
            setDisableNext(true)
            setShowMessage('*Este campo é obrigatório')
        } else {
            setDisableNext(false)
        }
    }, [formData.name]);

    return (
        <div className="form-container-register">
            <div className="label-form">
                <label>Your name</label>
            </div>
            <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                }
            />
            <div className="container-msg">
                <p><small>{msg}</small></p>
            </div>
        </div>
    )
}
export default NameInput;