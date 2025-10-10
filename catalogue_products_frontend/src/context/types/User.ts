export enum UserRole {
    ADMIN,
    USER,
}

export type User = {
    id: string;
    email: string;
    password: string;
    role: UserRole; 
}