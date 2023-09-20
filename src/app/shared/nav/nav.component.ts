import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  badgeValue: number = 0;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  logout(): void {
    localStorage.clear();
    this.sharedService.setAuthenticationStatus(false);
    this.router.navigateByUrl('/auth');
  }
}
