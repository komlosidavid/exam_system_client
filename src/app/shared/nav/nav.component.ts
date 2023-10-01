import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserClass } from 'src/app/models/userClass.model';
import { selectUser } from 'src/app/store/reducers/auth.reducers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user!: UserClass | null;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.router.navigateByUrl('/auth');
  }
}
