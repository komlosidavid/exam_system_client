import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accessToken: string | null = localStorage.getItem('accessToken');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.accessToken) {
      this.router.navigateByUrl('auth');
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }
}
