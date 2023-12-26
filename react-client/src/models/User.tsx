export enum UserRole
{
    ADMIN = "admin",
    USER = "user",
}

export type User = {
    username: string;
    name: string;
    emial: string;
    role: {
        name: UserRole;
    }
}