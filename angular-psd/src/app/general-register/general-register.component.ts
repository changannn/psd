import { Component } from '@angular/core';
import { RegistrationService } from "../registration.service";
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-general-register',
  templateUrl: './general-register.component.html',
  styleUrls: ['./general-register.component.css']
})
export class GeneralRegisterComponent {
  fullName: string | undefined;
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  registrationResponse$: Observable<any> = of(null); // Declare registrationResponse$ as an Observable

  constructor(private registrationService: RegistrationService) {
  }

  signUp() {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    this.registrationResponse$ = this.registrationService.registerUser(userData);
  }
}
