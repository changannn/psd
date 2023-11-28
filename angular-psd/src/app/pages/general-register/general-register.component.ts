import { Component } from '@angular/core';
import { RegistrationService } from "../../services/registration.service";
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { Route, Router } from '@angular/router';
import { VerificationRequest } from 'src/app/models/verification-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent {
  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  retypePassword: string = '';
  message: string = '';
  otpCode: string = '';

  constructor(private registrationService: RegistrationService, private router: Router, private authService: AuthService) { }

  signUp() {
    this.message = '';

    if (this.registerRequest.password != this.retypePassword) {
      this.message = 'Passwords do not match. Please try again.';
    }
    else {
      this.registerRequest.mfaEnabled = true;
      this.registrationService.registerUser(this.registerRequest)
        .subscribe({
          next: (response: AuthenticationResponse) => {
            if (response) {
              this.authenticationResponse = response;
            }
            else {
              this.message = 'Account created successfully\nYou will be redirected to the dashboard page in 3 seconds';
              setTimeout(() => {
                this.router.navigate(['dashboard']);
              }, 3000)
            }
          },
          error: (error) => {
            console.error('Error during sign up', error);
            if (typeof error.error === 'object') {
              this.message = this.constructErrorMessage(error.error);
            } else {
              this.message = 'Sign-up failed: ' + error.error;
            }
          }
        });
    }
  }

  // Function to construct an error message from the key-value pairs in the error object
  constructErrorMessage(errorObject: { [key: string]: string }): string {
    let errorMessage = 'Sign-up failed: ';
    
    for (const key in errorObject) {
      if (errorObject.hasOwnProperty(key)) {
        errorMessage += `${errorObject[key]} `;
      }
    }

    return errorMessage;
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
            // localStorage.setItem('token', response.token as string);
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
