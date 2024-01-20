import { ChangeDetectorRef, Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  
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
