import { CanActivateFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/reducers/auth.reducers';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthPermissionService).canActivate();
};

@Injectable()
export class AuthPermissionService {
  isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    this.store.pipe(select(selectIsAuthenticated)).subscribe((status) => {
      this.isAuthenticatedSubject.next(status);
    });

    if (this.isAuthenticatedSubject.value) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
