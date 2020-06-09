import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MenusRoutingModule} from './menus-routing.module';
import {MenusComponent} from './menus.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {MenuItemComponent} from './menu-list/menu-item/menu-item.component';
import {MenuCourseComponent} from './menu-list/menu-course/menu-course.component';

@NgModule({
  declarations: [
    MenusComponent,
    MenuListComponent,
    MenuEditComponent,
    MenuItemComponent,
    MenuCourseComponent,
  ],
  imports: [
    RouterModule,
    MenusRoutingModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class MenusModule { }
