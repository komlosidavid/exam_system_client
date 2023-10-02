import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/store/reducers/auth.reducers';
import * as AuthActions from '../../store/actions/auth.actions';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user!: User | null;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
