import { User } from "../models/User.js"
const { VITE_API_URL } = import.meta.env;

export default async function getUserInfo(): Promise<User>
{
    const response = await fetch(VITE_API_URL + "/employees/myinfo", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const userPromise: Promise<User> = response.json().then(json => 
    {
        const user: User = {} as User;
        Object.assign(user, json);

        return user;
    });

    return userPromise;
}
