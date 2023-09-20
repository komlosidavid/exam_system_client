import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from './interfaces/AuthenticationResponse';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private URL: string = 'http://localhost:8080/api/v1/auth/';

  private accessToken!: string;
  private refreshToken!: string;

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.URL + 'refresh', null);
  }
}
