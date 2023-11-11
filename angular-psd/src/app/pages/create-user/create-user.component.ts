import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  registerRequest: RegisterRequest = {};
  message: string = '';

  constructor(private registrationService: RegistrationService,private authService: AuthService ,private router: Router, private messageService: MessageService) {}

  createUser() {
    this.registrationService.createUser(this.registerRequest)
      .subscribe({
        next: (response: string) => {
          this.message = response;
          this.messageService.setMessage(this.message);
          this.router.navigate(['/user-management']);
        },
        error: (error) => {
          console.error('Unable to create user', error);
          this.message = 'Unable to create user: ' + error.error;
        }
      });
  }
}
