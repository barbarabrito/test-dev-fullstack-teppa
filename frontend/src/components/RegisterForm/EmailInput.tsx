const EmailInput = ({ formData, setFormData }: any) => {
    return (
        <div className="form-container-register">
            <div className="label-form">
                <label>Your email</label>
            </div>
            <input
                type="text"
                value={formData.email}
                onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                }
            />
        </div>
    )
}
export default EmailInput;