import {ProductModel} from './ProductModel';
import {MenuOrderModel} from './MenuOrderModel';

export class CartModel {
  customerEmail: string;
  customerPhoneNumber: string;
  customerFirstName: string;
  customerLastName: string;
  pickUpHour: string;
  products: Map<ProductModel, number>;
  menus: Map<MenuOrderModel, number>;

  constructor() {
    this.products = new Map<ProductModel, number>();
    this.menus = new Map<MenuOrderModel, number>();
  }

}


