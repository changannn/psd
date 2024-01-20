import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { Router } from '@angular/router';
import { VerificationRequest } from 'src/app/models/verification-request';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

  login() {
    this.loginService.loginUser(this.authenticationRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          this.authenticationResponse = response;
          if (!this.authenticationResponse.mfaEnabled && this.authenticationResponse.token) {
            this.authService.setJwt(this.authenticationResponse.token);
            this.router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          console.error('Error during login', error);
          this.message = 'Login failed: ' + error.error;
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
          if (response.token) {
            this.authService.setJwt(response.token);
            this.router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          console.error('Error during verification', error);
          this.message = 'Verification failed\n' + error.error;
        }
      });
  }
}