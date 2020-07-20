import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../model/RestaurantModel';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-result',
  templateUrl: './restaurant-result.component.html',
  styleUrls: ['./restaurant-result.component.css']
})
export class RestaurantResultComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  isOpen = false;
  photoUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.restaurant.photo) {
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081'
        + this.restaurant.photo.split(':')[1]);
    }
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    for (const businessHour of this.restaurant.businessHours) {
      const startHour = +businessHour.startTime.split(':')[0];
      const endHour = +businessHour.endTime.split(':')[0];
      console.log('jour :');
      console.log(day >= businessHour.startDay && day <= businessHour.endDay);
      console.log('heure :');
      console.log(hour >= startHour && hour <= endHour);
      if (day >= businessHour.startDay && day <= businessHour.endDay
          && hour >= startHour && hour <= endHour) {
        this.isOpen = true;
        break;
      }
    }
  }

}
