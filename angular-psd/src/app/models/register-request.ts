export interface RegisterRequest {
    fullName?: string;
    email?: string;
    username?: string;
    password?: string;
    mfaEnabled?: string;
    role?: string;
}