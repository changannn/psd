import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080'; // Replace with the URL of your Spring back end

  constructor(private http: HttpClient) { }

  loginUser(loginDetails: any) {
    return this.http.post(`${this.apiUrl}/auth/authenticate`, loginDetails);
  }
}
