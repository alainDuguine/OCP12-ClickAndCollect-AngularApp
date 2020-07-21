import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {MenuModel} from '../../model/MenuModel';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {RestaurantModel} from '../../model/RestaurantModel';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {

  restaurant: RestaurantModel;
  products: ProductModel[];
  menus: MenuModel[];
  photoUrl: SafeUrl;
  isLoading = true;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const restaurantId = params.restaurantId;
      this.orderService.getRestaurant(restaurantId).subscribe(
        result => {
          this.initData(result);
        },
        error => this.router.navigate(['/error'])
      );
    });
  }

  initData(data: any) {
    this.restaurant = data.restaurant;
    this.restaurant.distance = this.orderService.getDistance();
    if (this.restaurant.photo) {
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081'
        + this.restaurant.photo.split(':')[1]);
    }
    this.products = data.products;
    this.menus = data.menus;
    this.isLoading = false;
  }
}
