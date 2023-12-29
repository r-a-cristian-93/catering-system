export type User = {
    username: string;
    name: string | null;
    emial: string | null;
    role: Role;
}

export type Role = {
    name: RoleEnum;
}

export enum RoleEnum
{
    ADMIN = "admin",
    USER = "user"
}
