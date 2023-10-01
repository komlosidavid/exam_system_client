import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectAuthState,
  selectIsAuthenticated,
} from '../store/reducers/auth.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'http://localhost:8080/api/v1/auth/';

  constructor(private http: HttpClient, private store: Store) {}

  onHandleAuthentication(
    username: string,
    password: string
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.URL + 'authenticate', {
      username,
      password,
    });
  }

  refreshAccessToken(token: string | null): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.URL + 'refresh', token);
  }

  isAuthenticated(): boolean | undefined {
    let status;
    this.store.pipe(select(selectIsAuthenticated)).subscribe((status) => {
      status = status;
    });
    return status;
  }
}
