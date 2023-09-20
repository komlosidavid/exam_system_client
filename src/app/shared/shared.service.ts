import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.getInitialStatus()
  );
  // private userSubject = new BehaviorSubject<User>(new UserActivation);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  private getInitialStatus(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      return JSON.parse(isAuthenticated);
    }
    return false;
  }


  setAuthenticationStatus(status: boolean) {
    this.isAuthenticatedSubject.next(status);
    localStorage.setItem('isAuthenticated', JSON.stringify(status));
  }
}
