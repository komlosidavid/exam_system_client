import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Subscription, filter, interval, switchMap } from 'rxjs';
import { AuthenticationResponse } from './interfaces/AuthenticationResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accessToken: string | null = localStorage.getItem('accessToken');
  refreshToken: string | null = localStorage.getItem('refreshToken');
  private refreshTokenSubscription!: Subscription;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    if (!this.accessToken) {
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('dashboard');
    }

    this.startTokenRefreshing();
  }

  startTokenRefreshing() {
    this.stopTokenRefreshing();
    this.refreshTokenSubscription = interval(1000)
      .pipe(
        filter(() => !!localStorage.getItem('refreshItem')),
        switchMap(() => this.tokenService.getAccessToken())
      )
      .subscribe({
        next: (response: AuthenticationResponse) => {
          localStorage.setItem('accessToken', response.accessToken);
          console.log('dad');
        },
        error: (response) => {
          console.log(response);
        },
        complete: () => {
          console.log('Refresh token used!');
        },
      });
  }

  stopTokenRefreshing() {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
  }
}
