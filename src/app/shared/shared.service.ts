import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.getInitialStatus()
  );

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
