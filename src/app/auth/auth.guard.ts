import { CanActivateFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/reducers/auth.reducers';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthPermissionService).canActivate();
};

@Injectable()
export class AuthPermissionService {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    let isAuthenticated;
    this.store.pipe(select(selectIsAuthenticated)).subscribe((status) => {
      isAuthenticated = status;
    });

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
