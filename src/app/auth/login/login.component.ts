import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { AuthenticationRequest } from 'src/app/interfaces/authenticationRequest';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectErrorMessage } from 'src/app/store/reducers/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  isError: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private store: Store,
    private messageService: MessageService
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

  async onHandleAuthentication(): Promise<any> {
    const payload: AuthenticationRequest = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };

    this.store.dispatch(AuthActions.loginRequest({ payload }));

    this.store.pipe(select(selectErrorMessage)).subscribe((error: any) => {
      if (error && error.status === 403) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    });
  }
}
