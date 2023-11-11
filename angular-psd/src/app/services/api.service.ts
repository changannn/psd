import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchAccountUsers(): Observable<User[]> {
    const jwt = this.authService.getJwt();

    if (jwt) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      });

      return this.http.get<User[]>(`${this.apiUrl}/profile`, { headers });
    }

    return new Observable<User[]>();
  }
}