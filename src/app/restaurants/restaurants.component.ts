import {Component} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {CurrentUserModel} from '../model/CurrentUserModel';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {

  currentRestaurant: CurrentUserModel;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(
      restaurant => this.currentRestaurant = restaurant
    );
  }
}
