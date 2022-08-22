import { Link } from "react-router-dom";

const MessageForm = () => {
    return(
        <div className="form-container-register">
            <h3>Successfully registered!</h3>
            <Link to="/">Ir para a página de login</Link>
        </div>
    )
}
export default MessageForm;