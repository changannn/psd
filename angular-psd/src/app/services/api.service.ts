import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiURL; 
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchAccountUsers(): Observable<User[]> {
    const jwt = this.authService.getJwt();

    if (jwt) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`,
        'x-api-key': this.apiKey
      });

      return this.http.get<User[]>(`${this.apiUrl}/profile`, { headers });
    }

    return new Observable<User[]>();
  }

  editAccountUser(userId: number, user: User): Observable<string> {
    const jwt = this.authService.getJwt();

    // if (!jwt) {
    //   return throwError(() => new Error("User unauthorised"));
    // }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`,
      'x-api-key': this.apiKey
    });

    return this.http.put(`${this.apiUrl}/users/${userId}`, user, { headers, responseType: 'text' });
  }

  deleteAccountUser(userId: number): Observable<string> {
    const jwt = this.authService.getJwt();

    // if (!jwt) {
    //   return throwError(() => new Error("User unauthorised"));
    // }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`,
      'x-api-key': this.apiKey
    });

    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers, responseType: 'text' });
  } 

  getUserById(userId: number): Observable<User> {
    const jwt = this.authService.getJwt();

    // if (!jwt) {
    //   return throwError(() => new Error("User unauthorised"));
    // }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`,
      'x-api-key': this.apiKey
    });

    return this.http.get<User>(`${this.apiUrl}/users/${userId}`, { headers });
  }
}
