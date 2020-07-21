import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ClientsComponent} from './clients.component';
import {ClientOrderComponent} from './client-order/client-order.component';

const routes: Routes = [
  {path: '', component: ClientsComponent},
  {path: 'restaurant/:restaurantId', component: ClientOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
