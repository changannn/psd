import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  message: string = "";
  errorMessage: string = "";

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Trigger data refresh when route parameters change
      this.fetchUsers();
      this.message = this.messageService.getMessage();
      this.messageService.setMessage('');
    });
  }

  fetchUsers() {
    this.apiService.fetchAccountUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users: ', error);
        this.errorMessage = error.message;
      }
    });
  }

  editUser(userId: number) {
    this.router.navigate(['/user-edit', userId]);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.apiService.deleteAccountUser(user.id).subscribe({
        next: (response: string) => {
          this.message = response
          this.fetchUsers();
        },
        error: (error) => {
          console.log('Error deleting user: ', error)
          this.errorMessage = error.message;
        }
      });
    }
  }

  redirectToCreateUser() {
    this.router.navigate(["/user-create"]);
  }
}
