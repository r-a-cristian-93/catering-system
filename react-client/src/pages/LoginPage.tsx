import { useState } from "react";
import Credentials from "../models/Credentials";
import requestUserLogin from "../controllers/LoginController";

function LoginPage(): JSX.Element
{
    const [credentials, setCredentials] = useState<Credentials>({} as Credentials);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    {
        const { name, value } = event.target;

        setLoginFailed(false)

        setCredentials((prev) =>
        {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handleSubmit(event: React.MouseEvent<HTMLElement>): void
    {
        event.preventDefault();

        void requestUserLogin(credentials).then((response) =>
        {
            if (response.ok)
                window.location.pathname= "/home";
            else
                setLoginFailed(true);
        })
    }

    return (
        <div className="box login-box">
            <div className="box-title">Log In</div>
            <div className="box-content">
                <form name="login" className="form-big">
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        required
                        onChange={handleChange}
                    />
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="button"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                    {loginFailed && <span>Login failed. check your credentials.</span>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
