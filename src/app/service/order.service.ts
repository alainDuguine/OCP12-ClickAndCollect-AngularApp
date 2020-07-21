import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {RestaurantFullModel} from '../model/RestaurantFullModel';
import {DataManagementService} from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURI = '/orders';
  private restaurant: RestaurantFullModel;
  private distance: number;

  constructor(private dataManagement: DataManagementService) { }


  getRestaurant(restaurantId: any): Observable<RestaurantFullModel> {
    if (this.restaurant) {
      return of(this.restaurant);
    }
    return this.dataManagement.getResource<RestaurantFullModel>(
      this.orderURI + '/restaurant/' + restaurantId
    );
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }
}
