import {Injectable} from '@angular/core';
import {DataManagementService} from './data-management.service';
import {RestaurantModel} from '../model/RestaurantModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurantURI = '/restaurants/';

  constructor(private httpClient: HttpClient, private dataManagement: DataManagementService) {}

  getRestaurant(restaurantId: number): Observable<RestaurantModel> {
    return this.dataManagement.getResource<RestaurantModel>(
      this.restaurantURI + restaurantId
    );
  }

  updateRestaurant(restaurantId: number, restaurant: RestaurantModel) {
    return this.dataManagement.putResource<RestaurantModel>(
      this.restaurantURI + restaurantId,
      restaurant
    );
  }

  uploadPhoto(restaurantId: number, photo: any) {
    return this.dataManagement.postResource(
      this.restaurantURI + restaurantId + '/upload',
      photo
    );
  }
}
