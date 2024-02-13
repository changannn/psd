import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailVerificationResponse } from '../models/email-verification-response';
import { AuthenticationResponse } from '../models/authentication-response';
import { RegisterRequest } from '../models/register-request';
import { RegistrationService } from '../services/registration.service';
import { VerificationRequest } from '../models/verification-request';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.css']
})
export class EmailActionComponent {
  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  retypePassword: string = '';
  message: string = '';
  otpCode: string = '';
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    // Extract parameters from the URL
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Send POST request to backend service
        this.http.post<any>('http://localhost:8080/auth/confirm?token=' + token, {})
          .subscribe({
            next: (response: EmailVerificationResponse) => {
              this.message = 'Account verified successfully. You can now proceed with registration.'
              this.registerRequest.email = response.email
            },
            error: (error) => {
              // Error handling
              console.error('Error:', error.error);
              this.message = error.error
            }
          });
      }
    });
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
      this.registrationService.updaterUser(this.registerRequest)
        .subscribe({
          next: (response: AuthenticationResponse) => {
            if (response) {
              this.authenticationResponse = response;
            }
            else {
              this.message = 'Account created successfully\nYou will be redirected to the login page in 3 seconds';
              setTimeout(() => {
                this.router.navigate(['login']);
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
