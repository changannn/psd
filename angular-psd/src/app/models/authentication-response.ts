export interface AuthenticationResponse {
    token?: string;
    mfaEnabled?: boolean;
    secretImageUri?: string;
}