import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantsComponent} from './restaurants.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {RestaurantEditComponent} from './restaurant-edit/restaurant-edit.component';
import {RouterModule} from '@angular/router';
import {RestaurantsRoutingModule} from './restaurants-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    RestaurantsComponent,
    RestaurantEditComponent
  ],
  imports: [
    RouterModule,
    RestaurantsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FontAwesomeModule
  ]
})
export class RestaurantsModule { }
