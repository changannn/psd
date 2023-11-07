import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Observable, of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { Router } from '@angular/router';
import { VerificationRequest } from 'src/app/models/verification-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  authenticationRequest: AuthenticationRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  otpCode: any;
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    this.loginService.loginUser(this.authenticationRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          this.authenticationResponse = response;
          if (!this.authenticationResponse.mfaEnabled) {
            localStorage.setItem('token', response.token as string);
            this.router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          console.error('Error during login', error);
          this.message = 'Login failed\n' + error.message;
        }
      });
  }

  verifyMFA() {
    const verificationRequest: VerificationRequest = {
      username: this.authenticationRequest.username,
      code: this.otpCode
    };
    this.loginService.verifyCode(verificationRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          localStorage.setItem('token', response.token as string);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          console.error('Error during verification', error);
          this.message = 'Verification failed\n' + error.message;
        }
      });
  }
}