import {Injectable} from '@angular/core';
import {DataManagementService} from './data-management.service';
import {RestaurantModel} from '../model/RestaurantModel';
import {Observable, Subject} from 'rxjs';
import {ClientModel} from '../model/ClientModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantURI = '/restaurants';
  restaurantsResults = new Subject<RestaurantModel[]>();
  private restaurants: RestaurantModel[] = [];

  constructor(private dataManagement: DataManagementService) {}

  getRestaurant(restaurantId: number): Observable<RestaurantModel> {
    return this.dataManagement.getResource<RestaurantModel>(
      this.restaurantURI + '/' + restaurantId
    );
  }

  getRestaurantsAroundPosition(client: ClientModel) {
    const params = new Map();
    params.set('lat', client.latitude);
    params.set('long', client.longitude);
    params.set('rad', 5);
    console.log(params);
    this.dataManagement.getResource<RestaurantModel[]>(
      this.restaurantURI,
      params
    ).subscribe(
      (result: any) => {
        console.log(this.restaurants);
        this.restaurants = result;
        this.restaurantsResults.next(this.restaurants.slice());
      }
    );
  }

  updateRestaurant(restaurantId: number, restaurant: RestaurantModel) {
    return this.dataManagement.putResource<RestaurantModel>(
      this.restaurantURI + '/' + restaurantId,
      restaurant
    );
  }

  uploadPhoto(restaurantId: number, photo: any) {
    return this.dataManagement.postResource(
      this.restaurantURI + '/' + restaurantId + '/upload',
      photo
    );
  }
}
