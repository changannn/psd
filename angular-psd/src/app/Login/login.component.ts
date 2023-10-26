import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  role = 'admin';
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login() {
    const loginDetails = {
      username: this.username,
      password: this.password,
      role: this.role
    };
    this.http.post(`${this.apiUrl}/login`, loginDetails).subscribe((data) => {
      console.log(data);
    });
  }
}