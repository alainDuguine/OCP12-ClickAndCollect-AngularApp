import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {CurrentUserModel} from '../../model/CurrentUserModel';

@Component({
  selector: 'app-restaurant-header',
  templateUrl: './restaurant-header.component.html',
  styleUrls: ['./restaurant-header.component.css']
})
export class RestaurantHeaderComponent implements OnInit {
  restaurant: CurrentUserModel;

  constructor(private authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.restaurant = this.authService.currentUserValue;
  }

  onLogout() {
    this.authService.logout();

  }
}
