import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.css']
})
export class HomepageAdminComponent {
  token: string | null;

  constructor(private router: Router, private authService: AuthService) { 
    this.token = this.authService.getJwt();
  }

  logout(){
    if (this.token != null){
      this.router.navigate(['login']);
      this.authService.removeJwt();
    }
  }
}
