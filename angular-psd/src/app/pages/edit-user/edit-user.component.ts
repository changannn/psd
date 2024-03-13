import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  message: string = '';
  userId: number = 0;
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    role: 'USER',
    createdBy: 0,
    userCreationLimit: 0, 
  };

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam != null) {
          this.userId = +idParam;
          this.fetchUserDetails(this.userId);
        } else {
          console.error('No user ID provided');
          this.message = 'Unable to fetch user details: No ID provided'
        }
      })
  }

  fetchUserDetails(userId: number) {
    this.apiService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Unable to fetch user details: ', error);
        this.message = error.error
      }
    });
  }

  editUser(user: User) {
    this.apiService.editAccountUser(this.userId, user).subscribe({
      next: (response: string) => {
        this.messageService.setMessage(response);
        this.router.navigate(['/user-management']);
      },
      error: (error) => {
        console.error('Unable to update user: ', error);
        this.message = error.error;
      }
    });
  }
}
