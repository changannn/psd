import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

  token: string | null;
  isLoggedIn: string | null = "false";

  constructor(private router: Router, private authService: AuthService) { 
    this.token = this.authService.getJwt();
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  logout(){
    if (this.token != null){
      this.router.navigate(['login']);
      this.authService.removeJwt();
      this.authService.setIsLoggedOut();
    }
  }
}
