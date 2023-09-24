import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Subscription, filter, interval, mergeMap, switchMap } from 'rxjs';
import { AuthenticationResponse } from './interfaces/AuthenticationResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accessToken: string | null = localStorage.getItem('accessToken');
  private timerSubscription: Subscription | undefined;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    if (!this.accessToken) {
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('dashboard');
    }

    interval(1000 * 60 * 5 - 10000)
      .pipe(
        filter(() => localStorage.getItem('refreshToken') != null),
        mergeMap(() =>
          this.tokenService.getAccessToken(
            localStorage.getItem('refreshToken')!
          )
        )
      )
      .subscribe({
        next: (response: AuthenticationResponse) => {
          console.log(response);
          
          localStorage.setItem('accessToken', response.accessToken);
        },
        error: () => {
          this.router.navigateByUrl('error');
        },
      });
  }

}
