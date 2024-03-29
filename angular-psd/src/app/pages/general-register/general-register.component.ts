import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "../../services/registration.service";
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VerificationRequest } from 'src/app/models/verification-request';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent implements OnInit {
  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  retypePassword: string = '';
  message: string = '';
  otpCode: string = '';

  constructor(private registrationService: RegistrationService, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const navigationState = history.state;

    if (navigationState) {
      this.message = navigationState['successMessage'] || '';
      this.registerRequest.email = navigationState['emailVerificationResponse'] || null;
    }
  }

  signUp() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.message = '';

    if (this.registerRequest.password != this.retypePassword) {
      this.message = 'Passwords do not match. Please try again.';
    }
    else if (!passwordRegex.test(this.registerRequest.password)){
      this.message = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)';
    }
    else {
      this.registerRequest.mfaEnabled = true;
      this.registrationService.registerUser(this.registerRequest)
        .subscribe({
          next: (response: AuthenticationResponse) => {
            this.authenticationResponse = response;
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
          this.message = 'Account created successfully\nYou will be redirected to the login page in 3 seconds';
          setTimeout(() => {
            // localStorage.setItem('token', response.token as string);
            this.router.navigate(['login']);
          }, 3000)
        },
        error: (error) => {
          console.error('Error during verification', error);
          this.message = 'Verification failed\n' + error.message;
        }
      });
  }
}
