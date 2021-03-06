import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../model/RestaurantModel';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {OrderService} from '../../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-result',
  templateUrl: './restaurant-result.component.html',
  styleUrls: ['./restaurant-result.component.css']
})
export class RestaurantResultComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  isOpen = false;
  photoUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.restaurant.photo) {
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081'
        + this.restaurant.photo.split(':')[1]);
    }
    const date = new Date();
    const day = date.getDay() === 0 ? 7 : date.getDay();
    const hour = date.getHours();
    console.log(this.restaurant.businessHours);
    for (const businessHour of this.restaurant.businessHours) {
      const startHour = +businessHour.startTime.split(':')[0];
      const endHour = +businessHour.endTime.split(':')[0];
      if (day >= businessHour.startDay && day <= businessHour.endDay
          && hour >= startHour && hour <= endHour) {
        this.isOpen = true;
        break;
      }
    }
  }

  onSelect() {
    this.orderService.setDistance(this.restaurant.distance);
    this.router.navigate(['restaurant', this.restaurant.id], {relativeTo: this.route});
  }
}
