import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  role: any;
  fakeArray = new Array(10);

  constructor(private authService: AuthService) { 
    console.log(this.authService.getRole())
    this.role = this.authService.getRole();
  }
  
}