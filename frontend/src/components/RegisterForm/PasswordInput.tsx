const PasswordInput = ({ formData, setFormData }: any ) => {
    return (
        <div className="form-container-register">
            <div className="label-form">
                <label>Choose a password</label>
            </div>    
            <input
                type="text"
                placeholder="Password..."
                value={formData.password}
                onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                }
            />
            <input
                type="text"
                placeholder="Confirm password..."
                value={formData.confirmPassword}
                onChange={(event) =>
                    setFormData({ ...formData, confirmPassword: event.target.value })
                }
            />
        </div>
    )
}
export default PasswordInput;