import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLoginRoutingModule } from './auth-login-routing.module';
import { AuthLoginComponent } from './auth-login.component';
import { LoginCamComponent } from './components/login-cam/login-cam.component';


@NgModule({
  declarations: [
    AuthLoginComponent,
    LoginCamComponent
  ],
  imports: [
    CommonModule,
    AuthLoginRoutingModule
  ]
})
export class AuthLoginModule { }
