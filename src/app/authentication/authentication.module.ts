import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationRoutingModule} from './authentication.routing.module';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ClientsModule} from '../clients/clients.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        RouterModule,
        ClientsModule
    ]
})
export class AuthenticationModule { }
