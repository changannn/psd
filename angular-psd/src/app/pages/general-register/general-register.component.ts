import { Component } from '@angular/core';
import { RegistrationService } from "../../services/registration.service";
import {Observable, of} from 'rxjs';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { Route, Router } from '@angular/router';
import { VerificationRequest } from 'src/app/models/verification-request';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent {
  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  message: string = '';
  otpCode: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) {
  }

  signUp() {
    this.message = '';
    this.registrationService.registerUser(this.registerRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          if (response) {
            this.authenticationResponse = response;
          }
          else {
            this.message = 'Account created successfully\nYou will be redirected to the login page in 5 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 5000)
          }
        },
        error: (error) => {
          console.error('Error during sign up', error);
          this.message = 'Sign-up failed\n' + error.message;
        }
      });
  }
  
  verifyMFA() {
    this.message = '';
    const verificationRequest: VerificationRequest = {
      username: this.registerRequest.username,
      code: this.otpCode
    };
    this.registrationService.verifyCode(verificationRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          this.message = 'Account created successfully\nYou will be redirected to the login page in 5 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.token as string);
            this.router.navigate(['login']);
          }, 5000)
        },
        error: (error) => {
          console.error('Error during verification', error);
          this.message = 'Verification failed\n' + error.message;
        }
      });
  }
}
