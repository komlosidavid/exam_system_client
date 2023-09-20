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

  onHandleAuthentication(): void {
    const payload: AuthenticationRequest = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };

    this.service.onHandleAuthentication(payload).subscribe({
      next: (response: AuthenticationResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
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
