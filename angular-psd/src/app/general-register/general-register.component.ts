import { Component } from '@angular/core';
import { RegistrationService } from "../registration.service";
import {Observable, of} from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent {
  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  message: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) {
  }

  signUp() {
    this.message = '';
    this.registrationService.registerUser(this.registerRequest)
      .subscribe({
        next: (response: AuthenticationResponse): void => {
          if (response) {
            this.authenticationResponse = response;
          }
          else {
            this.message = 'Account created successfully\nYou will be redirected to the login page in 3 seconds';
            setTimeout((): void => {
              this.router.navigate(['login']);
            }, 3000)
          }
        }
      })
  }
}
