import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPermissionService } from './auth.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';  
import { LoginComponent } from './login/login.component';
import { AutocompleteoffDirective } from '../directives/autocompleteoff.directive';
import { SharedModule } from '../shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoginComponent, AutocompleteoffDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    SharedModule,
    ToastModule,
  ],
  providers: [AuthPermissionService],
})
export class AuthModule {}
