import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MenusRoutingModule} from './menus-routing.module';
import {MenusComponent} from './menus.component';

@NgModule({
  declarations: [
    MenusComponent,
  ],
  imports: [
    RouterModule,
    MenusRoutingModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class MenusModule { }
