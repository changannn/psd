import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  message: String = "";

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.fetchAccountUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error("Error fetching users: ", error);
        this.message = error.message;
      }
    });
  }  
}
