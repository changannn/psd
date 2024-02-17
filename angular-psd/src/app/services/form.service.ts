import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendToBackend(formData: string): Observable<string> {
    const token = this.authService.getJwt();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<string>(`${this.apiUrl}/auth/iemsim`, formData, httpOptions);
  }
  
}
