import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenusComponent} from './menus.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';

const routes: Routes = [
  {path: '',
    component: MenusComponent,
    children: [
      {path: 'new', component: MenuEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule {
}
