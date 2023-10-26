import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable, of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  role = 'admin';
  loginResponse$: Observable<any> = of(null); // Declare registrationResponse$ as an Observable

  constructor(private loginService: LoginService) {
  }

  login() {
    const loginDetails = {
      username: this.username,
      password: this.password,
      role: this.role
    };
    this.loginResponse$ = this.loginService.loginUser(loginDetails);
  }
}