import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-header',
  templateUrl: './root-header.component.html',
  styleUrls: ['./root-header.component.css']
})
export class RootHeaderComponent {
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
      this.authService.removeRole();
      this.authService.setIsLoggedOut();
    }
  }
}
