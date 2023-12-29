import UserRole from "./UserRole";

type User = {
    username: string;
    name: string | null;
    emial: string | null;
    role: {
        name: UserRole;
    }
}

export default User;