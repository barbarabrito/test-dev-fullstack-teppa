const NameInput = ({ formData, setFormData }:any) => {
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
        </div>
    )
}
export default NameInput;