import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  token: string | null;
  isLoggedIn: string | null = 'false';

  constructor(private router: Router, private authService: AuthService) { 
    this.token = this.authService.getJwt();
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  logout(){
    if (this.token != null){
      this.router.navigate(['login']);
      this.authService.removeJwt();
      this.authService.removeRole();
      this.authService.setIsLoggedOut();
    }
  }
}
