import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = environment.apiURL; // Replace with the URL of spring in environment folder 

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
