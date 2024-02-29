import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT: string = '';
  private isLoggedIn: string = 'false';
  private role: string = '';

  constructor() { }

  setIsLoggedIn(): void {
    localStorage.setItem('isLoggedIn', 'true');
  }
  
  setIsLoggedOut(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }

  getIsLoggedIn(): string | null {
    return localStorage.getItem('isLoggedIn');
  }

  setJwt(token: string): void {
    localStorage.setItem('token', token);
  }

  getJwt(): string | null {
    return localStorage.getItem('token');
  }

  removeJwt(): void {
    localStorage.removeItem('token');
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  removeRole(): void {
    localStorage.removeItem('role')
  }
}
