import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationRoutingModule} from './authentication.routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
