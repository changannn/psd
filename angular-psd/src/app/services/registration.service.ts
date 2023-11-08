import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080'; // Replace with the URL of your Spring back end

  constructor(private http: HttpClient) {}

  // To register the user
  registerUser(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/register`, registerRequest);
  }

  // To verify MFA code
  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/verify`, verificationRequest);
  }
}

