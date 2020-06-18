import {Injectable} from '@angular/core';
import {DataManagementService} from './data-management.service';
import {RestaurantModel} from '../model/RestaurantModel';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurant: RestaurantModel = {
    id: 1,
    name: 'Chez Monique & Myrtille',
    description: 'La meilleur cantine du quartier Gambetta',
    formattedAddress: '2 rue du Docteur Paquelin, 75020, Paris',
    email: 'alain_duguine@hotmail.fr',
    typeCuisine: 'cantine, slow-food, créatif',
    imageUrl: null,
    latitude: null,
    longitude: null,
    openingHours: null
  };

  restaurantURI = '/restaurants/';

  constructor(private dataManagement: DataManagementService) {
  }

  getRestaurant(restaurantId: number): Observable<RestaurantModel> {
    return of(this.restaurant);
    // return this.dataManagement.getResource<RestaurantModel>(
    //   this.restaurantURI + restaurantId
    // );
  }
}
