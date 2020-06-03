import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenusComponent} from './menus.component';

const routes: Routes = [
  {path: '',
    component: MenusComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule {
}
