export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdBy: number; // Assuming createdBy is the ID of the creating user
    userCreationLimit: number;
}