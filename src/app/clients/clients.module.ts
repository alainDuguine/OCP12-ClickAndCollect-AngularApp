import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients.component';
import {ClientsRoutingModule} from './clients-routing.module';
import {ClientGeosearchComponent} from './client-geosearch/client-geosearch.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ClientHeaderComponent} from './client-header/client-header.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientGeosearchComponent,
    ClientHeaderComponent
  ],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    AutocompleteLibModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class ClientsModule { }
