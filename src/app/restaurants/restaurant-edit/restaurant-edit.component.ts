import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressModel} from '../../model/AddressModel';
import {RestaurantModel} from '../../model/RestaurantModel';
import {MapService} from '../../service/map.service';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute, Params} from '@angular/router';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {

  restaurantForm: FormGroup;
  address: AddressModel;
  restaurant: RestaurantModel;
  addresses: any;
  keyword = 'label';
  isLoadingResult: boolean;
  restaurantId: number;
  faAdd = faSearchLocation;

  constructor(private mapService: MapService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params.restaurantId;
      console.log(this.restaurantId);
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        data => {
          this.restaurant = data;
          this.initForm();
        }
      );
    });
  }

  private initForm() {
    const address = this.restaurant.formattedAddress || '';
    console.log(address);

    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant.name, [Validators.required, Validators.maxLength(100)]),
      email: new FormControl(this.restaurant.email, Validators.email),
      address: new FormControl(address, Validators.required),
      description: new FormControl(''),
      typeCuisine: new FormControl('')
    });
  }

  getServerResponse(event) {
    this.isLoadingResult = true;
    event = event.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    console.log(event);
    this.mapService.getCoordinates(event).subscribe(
      (result: any) => {
        this.addresses = result.data;
        this.isLoadingResult = false;
      }
    );
  }

  selectEvent(event: any) {
    const formattedAddress = [event.name, event.postal_code, event.locality, event.region].filter(Boolean).join(', ');

    this.address = new AddressModel(
      event.latitude,
      event.longitude,
      formattedAddress
    );

    this.restaurantForm.controls.address.setValue(formattedAddress);
  }

  searchCleared() {
    this.addresses = [];
  }

  onSubmit() {

  }

  onClear() {

  }
}
