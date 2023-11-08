import { Component } from '@angular/core';
import { RegistrationService } from "../registration.service";
import {Observable, of, tap} from 'rxjs';
import { AuthResponse } from '../shared/auth-response.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent {
  errorMessage : string = "";
  fullName: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  registrationResponse$: Observable<AuthResponse> | null = null;

  constructor(private registrationService: RegistrationService, private authService: AuthService) { }

  signUp() {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    this.registrationResponse$ = this.registrationService.registerUser(userData).pipe(
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
