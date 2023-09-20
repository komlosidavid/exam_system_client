import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationRequest } from 'src/app/interfaces/authenticationRequest';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { AuthenticationResponse } from 'src/app/interfaces/AuthenticationResponse';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private service: AuthService,
    private messageService: MessageService,
    private store: Store,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onHandleAuthentication(): void {
    const payload: AuthenticationRequest = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };

    this.service.onHandleAuthentication(payload).subscribe({
      next: (response: AuthenticationResponse) => {
        // this.store.dispatch(
        //   new AuthActions.Auth({
        //     accessToken: response.accessToken,
        //     refreshToken: response.refreshToken,
        //   })
        // );

        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.sharedService.setAuthenticationStatus(true);
      },
      complete: () => {
        this.router.navigateByUrl('dashboard');
      },
      error: (response) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.error.message,
        });
      },
    });
  }
}
