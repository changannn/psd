import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable, of, tap } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../shared/auth-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = "";
  username: string | undefined;
  password: string | undefined;
  loginResponse$: Observable<AuthResponse> | null = null;

  constructor(private loginService: LoginService, private authService: AuthService) { }

  login() {
    const loginDetails = {
      username: this.username,
      password: this.password
    };
    // this.loginResponse$ = this.loginService.loginUser(loginDetails);
    this.loginResponse$ = this.loginService.loginUser(loginDetails).pipe(
      tap((response) => {
        if (response.token) {
          this.authService.setJwt(response.token);
        } else if (response.message) {
          this.errorMessage = response.message;
        }
      })
    );
  }
}