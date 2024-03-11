import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-psd';
  idleState = 'NOT_STARTED';
  countdown?: number|null = null;
  timedOut = false;
  lastPing?: Date|null = null;


  token: string | null;
  isLoggedIn: string | null = '';

  constructor(private router: Router, private authService: AuthService, private idle: Idle, private keepalive: Keepalive) { 
    this.token = this.authService.getJwt();
    this.isLoggedIn = this.authService.getIsLoggedIn();

    if(this.isLoggedIn == 'true'){
      // set idle parameters
      idle.setIdle(300); // how long can they be inactive before considered idle, in seconds 5min = 300seconds
      idle.setTimeout(900); // how long can they be idle before considered timed out, in seconds 15min = 900seconds
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

      // do something when the user becomes idle
      idle.onIdleStart.subscribe(() => {
        this.idleState = 'IDLE';
      });
      // do something when the user is no longer idle
      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'NOT_IDLE';
        console.log(`${this.idleState} ${new Date()}`)
        this.countdown = null;
        // cd.detectChanges(); // how do i avoid this kludge?
      });
      // do something when the user has timed out
      idle.onTimeout.subscribe(() => {
        this.idleState = 'TIMED_OUT';
        this.logout();
      }
      );
      // do something as the timeout countdown does its thing
      idle.onTimeoutWarning.subscribe(seconds => {
        this.countdown = seconds;
      });

      // set keepalive parameters, omit if not using keepalive
      keepalive.interval(60); // will ping at this interval while not idle, in seconds
      keepalive.onPing.subscribe(() => this.lastPing = new Date()); // do something when it pings
    }
  }

  // Maybe need to remove/edit this portion for a proper logout
  logout(){
    if (this.token != null){
      this.router.navigate(['login']);
      this.authService.removeJwt();
      this.authService.removeRole();
      this.authService.setIsLoggedOut();
    }
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = null;
    this.lastPing = null;
  }
  
  ngOnInit(): void {
    // right when the component initializes, start reset state and start watching
    this.reset();
  }

}
