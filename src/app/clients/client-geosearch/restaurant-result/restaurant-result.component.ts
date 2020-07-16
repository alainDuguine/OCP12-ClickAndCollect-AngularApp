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
  photoUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.restaurant.photo) {
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081'
        + this.restaurant.photo.split(':')[1]);
    }
  }

}
