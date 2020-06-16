import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthenticationComponent} from './authentication.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '',
    component: AuthenticationComponent,
    children: [
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
