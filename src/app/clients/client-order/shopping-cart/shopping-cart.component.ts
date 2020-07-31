import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../service/order.service';
import {CartModel} from '../../../model/CartModel';
import {Subscription} from 'rxjs';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MenuOrderModel} from '../../../model/MenuOrderModel';
import {ProductModel} from '../../../model/ProductModel';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BusinessHour, RestaurantModel} from '../../../model/RestaurantModel';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('f') form: NgForm;
  @Input() restaurant: RestaurantModel;
  shoppingCart: CartModel;
  private shoppingCartSub: Subscription;
  faMinus = faMinusCircle;
  faPlus = faPlusCircle;
  private matchingDay: BusinessHour;
  hourForm: number;
  isOpen = false;

  constructor(private orderService: OrderService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.shoppingCart = this.orderService.shoppingCart;
    this.shoppingCartSub = this.orderService.cartSubject.subscribe(
      (shoppingCart: CartModel) => this.shoppingCart = shoppingCart
    );
  }

  ngOnDestroy(): void {
    if (this.shoppingCartSub) {
      this.shoppingCartSub.unsubscribe();
    }
  }

  onRemoveProduct(mapProduct: [ProductModel, number]) {
    this.orderService.deleteProductFromCart(mapProduct[0]);
    if (mapProduct[1] > 1) {
      this.orderService.addProductToCart(mapProduct[0], mapProduct[1] - 1);
    }
  }

  onAddProduct(mapProduct: [ProductModel, number]) {
    this.orderService.deleteProductFromCart(mapProduct[0]);
    const quantity = +mapProduct[1] + 1;
    this.orderService.addProductToCart(mapProduct[0], quantity);
  }

  onRemoveMenu(mapMenu: [MenuOrderModel, number]) {
    this.orderService.deleteMenuFromCart(mapMenu[0]);
    if (mapMenu[1] > 1) {
      this.orderService.addMenuToCart(mapMenu[0], mapMenu[1] - 1);
    }
  }

  onAddMenu(mapMenu: [MenuOrderModel, number]) {
    this.orderService.deleteMenuFromCart(mapMenu[0]);
    const quantity = +mapMenu[1] + 1;
    this.orderService.addMenuToCart(mapMenu[0], quantity);
  }

  getShoppingCartMenus() {
    return Array.from(this.shoppingCart.menus.entries());
  }

  getShoppingCartProducts() {
    return Array.from(this.shoppingCart.products.entries());
  }

  isEmpty(): boolean {
    if (this.shoppingCart.menus && this.shoppingCart.products) {
      return this.shoppingCart.menus.size === 0 && this.shoppingCart.products.size === 0;
    } else {
      return true;
    }
  }

  getTotal(): number {
    if (!this.isEmpty()) {
      return this.orderService.getTotalShoppingCart();
    }
  }

  onValidateOrder(orderModal: TemplateRef<any>) {
    this.modalService.open(orderModal);
  }

  onSubmitValidation(f: NgForm) {
    console.log(this.shoppingCart);
    console.log(f.value);
  }

  getHours() {
    const hourTable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const date = new Date();

    if (!this.matchingDay) {
      this.matchingDay = this.getMatchingDay(date);
    }
    const lowestHour = date.getHours() > +this.matchingDay.startTime.slice(0, 2) ? date.getHours() : +this.matchingDay.startTime.slice(2);
    return hourTable.slice(lowestHour, +this.matchingDay.endTime.slice(0, 2) + 1);
  }

  getMinutes() {
    const minuteTable = ['00', '15', '30', '45'];
    const date = new Date();
    const lengthStartTime = +this.matchingDay.startTime.length;
    const lengthEndTime = +this.matchingDay.startTime.length;
    const startTimeHour = +this.matchingDay.startTime.slice(0, 2);
    const startTimeMinutes = +this.matchingDay.startTime.slice(lengthStartTime - 2, lengthStartTime - 1);
    const endTimeHour = +this.matchingDay.endTime.slice(0, 2);
    const endTimeMinutes = +this.matchingDay.endTime.slice(lengthEndTime - 2, lengthEndTime - 1);

    // console.log('startTimeLength', lengthStartTime);
    // console.log('endTimeLength', lengthEndTime);
    // console.log('startTimeHour', startTimeHour);
    // console.log('startTimeMinute', startTimeMinutes);
    // console.log('endTimeHour', endTimeHour);
    // console.log('endTimeMinute', endTimeMinutes);
    // console.log('dateNowHour', date.getHours());
    // console.log('hourForm', +this.hourForm);

    let lowestMinuteIndex;
    let highestMinuteIndex;
    if (date.getHours() === startTimeHour || +this.hourForm === startTimeHour) {
      lowestMinuteIndex = minuteTable.findIndex(
        minute => +minute === startTimeMinutes);
      highestMinuteIndex = minuteTable.length - 1;
    } else if (date.getHours() === endTimeHour || +this.hourForm === endTimeHour ) {
      lowestMinuteIndex = 0;
      highestMinuteIndex = minuteTable.findIndex(
        minute => +minute === endTimeMinutes);
      // console.log('lastHourMinute', highestMinuteIndex);
    } else if (date.getHours() == this.hourForm) {
      lowestMinuteIndex = minuteTable.findIndex(
        minute => +minute > date.getMinutes());
      if (lowestMinuteIndex === -1) {
        this.hourForm++;
      }
      highestMinuteIndex = minuteTable.length - 1;
      // console.log('dateNow : lowestMinute', lowestMinuteIndex);
      // console.log('dateNow : highestMinute', highestMinuteIndex);
    } else {
        lowestMinuteIndex = 0;
        highestMinuteIndex = minuteTable.length;
    }
    // console.log('lowIndex', lowestMinuteIndex);
    // console.log('highIndex', highestMinuteIndex);
    return minuteTable.slice(lowestMinuteIndex, highestMinuteIndex + 1);
  }

  getMatchingDay(date: Date) {
    const day = date.getDay() === 0 ? 7 : date.getDay();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = '' + date.getHours() + minutes;
    return this.restaurant.businessHours
      .filter(hour => day >= hour.startDay && day <= hour.endDay)
      .map(hour => {
        hour.startTime = '' + hour.startTime.replace(':', '');
        hour.endTime = '' + hour.endTime.replace(':', '');
        return hour;
      })
      .find(hour => +time >= +hour.startTime && +time <= +hour.endTime);
  }

  onCloseModal() {
    this.modalService.dismissAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
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
}
