import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients.component';
import {ClientsRoutingModule} from './clients-routing.module';

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    ClientsRoutingModule,
    CommonModule
  ]
})
export class ClientsModule { }
