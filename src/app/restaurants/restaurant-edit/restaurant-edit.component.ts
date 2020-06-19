import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusinessHour, RestaurantModel} from '../../model/RestaurantModel';
import {MapService} from '../../service/map.service';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute, Params} from '@angular/router';
import {faPlusCircle, faSearchLocation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {

  restaurantForm: FormGroup;
  restaurant: RestaurantModel;
  addresses: any;
  keyword = 'label';
  isLoadingResult: boolean;
  restaurantId: number;
  faSearch = faSearchLocation;
  faAdd = faPlusCircle;
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '15', '30', '45'];

  constructor(private mapService: MapService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params.restaurantId;
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        data => {
          this.restaurant = data;
          this.populateForm();
        }
      );
    });
  }

  private initForm() {
    this.restaurantForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl({value: '', disabled: true}),
      address: new FormControl('', Validators.required),
      description: new FormControl(''),
      typeCuisine: new FormControl(''),
      businessHour: this.initBusinessHour()
    });
  }

  initBusinessHour() {
    return new FormGroup({
      startDay: new FormControl(null, Validators.required),
      endDay: new FormControl(null, Validators.required),
      startTimeHour: new FormControl(null, Validators.required),
      startTimeMinute: new FormControl(null, Validators.required),
      endTimeHour: new FormControl(null, Validators.required),
      endTimeMinute: new FormControl(null, Validators.required)}
    );
  }

  private populateForm() {
    this.restaurantForm.patchValue({
      name: this.restaurant.name,
      email: this.restaurant.email,
      address: this.restaurant.formattedAddress,
      description: this.restaurant.description,
      typeCuisine: this.restaurant.typeCuisine,
    });
    this.restaurantForm.get('businessHour').reset();
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

    this.restaurant.formattedAddress = formattedAddress;
    this.restaurant.latitude = event.latitude;
    this.restaurant.longitude = event.longitude;

    console.log(this.restaurant);
    this.restaurantForm.controls.address.setValue(formattedAddress);
  }

  searchCleared() {
    this.addresses = [];
  }

  onSubmit() {
    this.restaurant.name = this.restaurantForm.value.name;
    this.restaurant.description = this.restaurantForm.value.description;
    this.restaurant.typeCuisine = this.restaurantForm.value.typeCuisine;
    console.log(this.restaurant);
    this.restaurantService.updateRestaurant(this.restaurantId, this.restaurant)
      .subscribe((result: RestaurantModel) => {
          this.restaurant = result;
          alert('Les informations ont été enregistrées');
          console.log(this.restaurant);
        }
      );
  }

  onClear() {
    this.populateForm();
  }

  onAddBusinessHour() {
    console.log(this.restaurantForm.get('businessHour').value);
    const businessHours = this.restaurantForm.get('businessHour').value;
    const businessHour = new BusinessHour();
    businessHour.startDay = this.daysOfWeek.indexOf(businessHours.startDay) + 1;
    businessHour.endDay = this.daysOfWeek.indexOf(businessHours.endDay) + 1;
    businessHour.startTime = businessHours.startTimeHour + ':' + businessHours.startTimeMinute;
    businessHour.endTime = businessHours.endTimeHour + ':' + businessHours.endTimeMinute;
    console.log(businessHour);
    if (!this.restaurant.businessHours) { this.restaurant.businessHours = []; }
    this.restaurant.businessHours.push(businessHour);
    this.restaurantForm.get('businessHour').reset();
  }
}


