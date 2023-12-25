import { useState } from "react";

type Credentials = { username: string; password: string };

async function requestloginUser(credentials: Credentials): Promise<void>
{
    await fetch("http://localhost:8888/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
        credentials: "include",
    })
        .then((data) => data.json());
}

function LoginPage(): JSX.Element
{
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    {
        const { name, value } = event.target;

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

        void requestloginUser(credentials);

        // setToken(token);
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
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
