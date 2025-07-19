import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  authStatus = this.loggedIn.asObservable();

  login() {
    // lógica de login
    this.loggedIn.next(true);
  }

  logout() {
    // lógica de logout
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}
