import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Form } from '../models/form';


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
    return this.http.post<string>(`${this.apiUrl}/iemsim`, formData, httpOptions);
  }

  fromBackend():Observable<Form[]> {

    const jwt = this.authService.getJwt();
    if (jwt) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      });
      return this.http.get<Form[]>(`${this.apiUrl}/iemsim`, { headers });
    }
    return new Observable<Form[]>();
  }

}
