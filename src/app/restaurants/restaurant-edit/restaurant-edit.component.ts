import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {BusinessHour, RestaurantModel} from '../../model/RestaurantModel';
import {MapService} from '../../service/map.service';
import {RestaurantService} from '../../service/restaurant.service';
import {ActivatedRoute, Params} from '@angular/router';
import {faPlusCircle, faSearchLocation, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {businessHourValidator} from './validators/business-hour-validator.directive';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

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
  faClose = faTimesCircle;
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '15', '30', '45'];
  newHour = false;
  photo: File;
  photoUrl: SafeUrl;
  imageError: string;

  constructor(private mapService: MapService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params.restaurantId;
      this.restaurantService.getRestaurant(this.restaurantId).subscribe(
        data => {
          this.restaurant = data;
          console.log(this.restaurant);
          if (this.restaurant.photo) {
            this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081' + this.restaurant.photo.split(':')[1]);
          }
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
      businessHours: new FormArray([])
    });

  }

  initBusinessHour() {
    return new FormGroup({
        startDay: new FormControl(null, Validators.required),
        endDay: new FormControl(null, Validators.required),
        startTimeHour: new FormControl(null, Validators.required),
        startTimeMinute: new FormControl(null, Validators.required),
        endTimeHour: new FormControl(null, Validators.required),
        endTimeMinute: new FormControl(null, Validators.required)
      }, {
        validators: businessHourValidator
      }
    );
  }

  populateForm() {
    const description = this.restaurant.description ? this.restaurant.description : '';
    const typeCuisine = this.restaurant.typeCuisine ? this.restaurant.typeCuisine : '';

    this.restaurantForm.patchValue({
      name: this.restaurant.name,
      email: this.restaurant.email,
      address: this.restaurant.formattedAddress,
      description,
      typeCuisine
    });

    if (this.restaurant.businessHours) {
      for (const hour of this.restaurant.businessHours) {
        const startDay = this.daysOfWeek[hour.startDay - 1];
        const endDay = this.daysOfWeek[hour.endDay - 1];
        const startTimeHour = hour.startTime.split(':')[0];
        const startTimeMinute = hour.startTime.split(':')[1];
        const endTimeHour = hour.endTime.split(':')[0];
        const endTimeMinute = hour.endTime.split(':')[1];
        (this.restaurantForm.get('businessHours') as FormArray).push(new FormGroup({
            startDay: new FormControl(startDay, Validators.required),
            endDay: new FormControl(endDay, Validators.required),
            startTimeHour: new FormControl(startTimeHour, Validators.required),
            startTimeMinute: new FormControl(startTimeMinute, Validators.required),
            endTimeHour: new FormControl(endTimeHour, Validators.required),
            endTimeMinute: new FormControl(endTimeMinute, Validators.required)
          }, {
            validators: businessHourValidator
          })
        );
      }
    } else {
      this.initBusinessHour();
    }
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
    this.restaurant.businessHours = [];

    const businessHours = this.restaurantForm.get('businessHours').value;
    businessHours.forEach(businessHour => {
      const newBusinessHour = new BusinessHour();
      newBusinessHour.startDay = this.daysOfWeek.indexOf(businessHour.startDay) + 1;
      newBusinessHour.endDay = this.daysOfWeek.indexOf(businessHour.endDay) + 1;
      newBusinessHour.startTime = businessHour.startTimeHour + ':' + businessHour.startTimeMinute;
      newBusinessHour.endTime = businessHour.endTimeHour + ':' + businessHour.endTimeMinute;
      if (!this.restaurant.businessHours) {
        this.restaurant.businessHours = [];
      }
      this.restaurant.businessHours.push(newBusinessHour);
    });

    this.restaurantService.updateRestaurant(this.restaurantId, this.restaurant)
      .subscribe((result: RestaurantModel) => {
          this.restaurant = result;
          alert('Les informations ont été enregistrées');
          console.log(this.restaurant);
        }
      );
  }

  onAddBusinessHour() {
    const control = this.restaurantForm.get('businessHours') as FormArray;
    control.push(this.initBusinessHour());
  }

  onDeleteHour(i: number) {
    const controls = this.restaurantForm.get('businessHours') as FormArray;
    controls.removeAt(i);
    this.restaurantForm.markAsDirty();
  }

  onClear() {
    const arr = this.restaurantForm.controls.businessHours as FormArray;
    arr.controls = [];
    this.populateForm();
  }

  getBusinessHours(restaurantForm) {
    return restaurantForm.get('businessHours').controls;
  }

  onFileChanged(event) {
    this.photo = event.target.files[0];
    if (this.photo.size > 3145728) {
      this.imageError = 'Le poids de l\'image doit être inférieur à 3Mo';
    } else if (!['image/png', 'image/jpeg'].includes(this.photo.type)) {
      this.imageError = 'L\'image doit être au format jpg ou png';
    } else {
      this.imageError = '';
      this.photoUpload();
    }
  }

  photoUpload() {
    const formData = new FormData();
    formData.append('photo', this.photo);
    this.restaurantService.uploadPhoto(this.restaurantId, formData).subscribe(
      data => {
        console.log(data);
        this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081' + data.photo.split(':')[1] + '?' + Date.now());
      }
    );
  }
}


