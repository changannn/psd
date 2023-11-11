import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message: string = "";

  getMessage() {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }
}