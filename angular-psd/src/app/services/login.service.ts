import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiURL; // Replace with the URL of spring in environment folder
  private apiHeaders = new HttpHeaders({
    'x-api-key': environment.apiKey
  });

  constructor(private http: HttpClient) { }

  loginUser(authenticationRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/authenticate`, authenticationRequest, { headers: this.apiHeaders });
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/verify`, verificationRequest, { headers: this.apiHeaders });
  }
}
