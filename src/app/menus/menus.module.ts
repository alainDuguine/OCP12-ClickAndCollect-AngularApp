import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MenusRoutingModule} from './menus-routing.module';
import {MenusComponent} from './menus.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';

@NgModule({
  declarations: [
    MenusComponent,
    MenuListComponent,
    MenuEditComponent,
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
