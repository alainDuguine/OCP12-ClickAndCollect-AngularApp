import {Component, OnInit} from '@angular/core';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {ClientModel} from '../../model/ClientModel';
import {MapService} from '../../service/map.service';

@Component({
  selector: 'app-client-geosearch',
  templateUrl: './client-geosearch.component.html',
  styleUrls: ['./client-geosearch.component.css']
})
export class ClientGeosearchComponent implements OnInit {
  faSearch = faSearchLocation;
  addresses: any;
  keyword = 'label';
  isLoadingResult: any;
  client = new ClientModel();
  formattedAddress: string;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  selectEvent(event: any) {
    const formattedAddress = [event.name, event.postal_code, event.locality, event.region].filter(Boolean).join(', ');
    console.log(formattedAddress);

    this.client.formattedAddress = formattedAddress;
    this.client.latitude = event.latitude;
    this.client.longitude = event.longitude;
    this.formattedAddress = formattedAddress;
  }

  getServerResponse(event: any) {
    this.isLoadingResult = true;
    event = event.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    this.mapService.getCoordinates(event).subscribe(
      (result: any) => {
        console.log(result);
        this.addresses = result.data;
        this.isLoadingResult = false;
      }, error => console.log(error)
    );
  }

  searchCleared() {
    this.addresses = [];
  }

}
