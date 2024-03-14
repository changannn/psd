import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = environment.apiURL; // Replace with the URL of spring in environment folder
  private apiKey = environment.apiKey;
  private apiHeaders = new HttpHeaders({
    'x-api-key': environment.apiKey
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  // To register an account
  registerUser(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/register`, registerRequest, { headers: this.apiHeaders });
  }

  updaterUser(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/update`, registerRequest, { headers: this.apiHeaders });
  }

  // To verify MFA code
  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/verify`, verificationRequest, { headers: this.apiHeaders });
  }

  createUser(registerRequest: RegisterRequest) {
    const token = this.authService.getJwt();
    // Set up the headers with the Authorization header containing the JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'x-api-key': this.apiKey
    });


    return this.http.post(`${this.apiUrl}/users`, registerRequest, { headers, responseType: 'text' });
  }
}

