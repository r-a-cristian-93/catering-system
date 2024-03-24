import { useState } from "react";
import { Credentials } from "../../models/Credentials";
import { requestUserLogin } from "../../controllers/LoginController";
import css from "./LoginPage.module.css"

export default function LoginPage(): JSX.Element
{
    const [ credentials, setCredentials ] = useState<Credentials>({} as Credentials);
    const [ loginFailed, setLoginFailed ] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    {
        const { name, value } = event.target;

        setLoginFailed(false);

        setCredentials((prev) =>
        {
            return {
                ...prev,
                [ name ]: value,
            };
        });
    }

    function handleSubmit(event: React.MouseEvent<HTMLElement>): void
    {
        event.preventDefault();

        void requestUserLogin(credentials).then((response) =>
        {
            if (response.ok) window.location.pathname = "/";
            else setLoginFailed(true);
        });
    }

    return (
        <div className={css.login_box}>
            <div className={css.login_box_content}>
                <div className={css.login_box_title}>Welcome back! Let's get started.</div>
                <form name="login" className={css.login_form}>
                    <label>
                        <span><img src="/img/profile.png" /></span>
                        <input name="username" type="text" placeholder="Username" required onChange={handleChange} />
                    </label>
                    <label>
                        <span><img src="/img/password.png" /></span>
                        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
                    </label>
                    <button type="submit" className="button" onClick={handleSubmit}>
                        Login
                    </button>
                    {loginFailed && <span>Login failed. check your credentials.</span>}
                </form>
            </div>
        </div>
    );
}