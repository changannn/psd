import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-psd';

  token: string | null;
  isLoggedIn: string | null = "";

  constructor(private router: Router, private authService: AuthService) { 
    this.token = this.authService.getJwt();
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  // Maybe need to remove/edit this portion for a proper logout
  logout(){
    if (this.token != null){
      this.router.navigate(['login']);
      this.authService.removeJwt();
      this.authService.setIsLoggedOut();
    }
  }
}
