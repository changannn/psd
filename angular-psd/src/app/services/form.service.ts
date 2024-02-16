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

  sendToBackend(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/test`, formData);
  }
}
