import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT:string = "";

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
