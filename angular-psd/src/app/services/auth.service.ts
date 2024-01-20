import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private JWT: string = "";

  public isLoggedIn$: string = "false";

  constructor() { }

  setJwt(token: string): void {
    localStorage.setItem(this.JWT, token);
  }

  getJwt(): string | null {
    return localStorage.getItem(this.JWT);
  }

  removeJwt(): void {
    localStorage.removeItem(this.JWT);
  }
}
