export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    NONE = "NONE"
}

export type User = {
    id: string;
    email: string;
    password: string;
    role: UserRole; 
}