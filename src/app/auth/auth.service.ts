import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../interfaces/authenticationRequest';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'http://localhost:8080/api/v1/auth/';

  constructor(private http: HttpClient) {}

  onHandleAuthentication(
    payload: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      this.URL + 'authenticate',
      payload
    );
  }

  refreshAccessToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('refresh', null);
  }
}
