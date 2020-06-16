import {Component} from '@angular/core';
import {AddressModel} from '../model/AddressModel';
import {MapService} from '../service/map.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {

  address: AddressModel;
  addresses: any;
  keyword = 'label';
  isLoadingResult: boolean;

  constructor(private mapService: MapService) {
  }

  getServerResponse(event) {
    this.isLoadingResult = true;
    event = event.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    this.mapService.getCoordinates(event).subscribe(
      (result: any) => {
        this.addresses = result.data;
        this.isLoadingResult = false;
      }
    );
  }

  selectEvent(event: any) {
    this.address = new AddressModel(
      event.latitude,
      event.longitude,
      event.label
    );
  }

  searchCleared() {
    this.addresses = [];
  }
}
