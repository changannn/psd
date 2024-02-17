import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT: string = "";
  private isLoggedIn: string = "false";
  private role: string = "";

  constructor() { }

  setIsLoggedIn(): void {
    localStorage.setItem(this.isLoggedIn, "true");
  }
  
  setIsLoggedOut(): void {
    localStorage.setItem(this.isLoggedIn, "false");
  }

  getIsLoggedIn(): string | null {
    return localStorage.getItem(this.isLoggedIn);
  }

  setJwt(token: string): void {
    localStorage.setItem(this.JWT, token);
  }

  getJwt(): string | null {
    return localStorage.getItem(this.JWT);
  }

  removeJwt(): void {
    localStorage.removeItem(this.JWT);
  }

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }
}
