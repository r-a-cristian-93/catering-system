import UserRole from "./UserRole";

type User = {
    username: string;
    name: string;
    emial: string;
    role: {
        name: UserRole;
    }
}

export default User;