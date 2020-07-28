import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {RestaurantFullModel} from '../model/RestaurantFullModel';
import {DataManagementService} from './data-management.service';
import {CartModel} from '../model/CartModel';
import {ProductModel} from '../model/ProductModel';
import {MenuOrderModel} from '../model/MenuOrderModel';
import {CourseModel, ProductInCourseModel} from '../model/MenuModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURI = '/orders';
  private restaurant: RestaurantFullModel;
  private distance: number;
  cartSubject = new Subject<CartModel>();
  private cart: CartModel;

  constructor(private dataManagement: DataManagementService) {
    this.cart = new CartModel();
    if (localStorage.getItem('menuCart')) {
      this.cart.menus = new Map<MenuOrderModel, number>(JSON.parse(localStorage.menuCart));
      for (const menu of this.cart.menus) {
        menu[0].selectedProducts = new Map<CourseModel, ProductInCourseModel>(
          JSON.parse(localStorage.getItem('productsInMenu' + menu[0].id))
        );
      }
    }
    if (localStorage.getItem('productCart')) {
      this.cart.products = new Map<ProductModel, number>(JSON.parse(localStorage.productCart));
    }
  }

  addMenuToCart(menu: MenuOrderModel, quantity: number) {
    menu.id = this.cart.menus.size + 1;
    this.cart.menus.set(menu, quantity);
    this.setMenuInLocalStorage();
    this.cartSubject.next(this.cart);
  }

  private setMenuInLocalStorage() {
    localStorage.menuCart = JSON.stringify(Array.from(this.cart.menus));
    for (const menuInCart of this.cart.menus) {
      const selectedProducts = menuInCart[0].selectedProducts.entries();
      localStorage.setItem('productsInMenu' + menuInCart[0].id, JSON.stringify(Array.from(selectedProducts)));
    }
  }

  deleteMenuFromCart(menu: MenuOrderModel) {
    this.cart.menus.delete(menu);
    localStorage.removeItem('menuCart');
    localStorage.removeItem('productsInMenu' + menu.id);
    this.setMenuInLocalStorage();
    this.cartSubject.next(this.cart);
  }

  addProductToCart(product: ProductModel, quantity: number) {
    this.cart.products.set(product, quantity);
    localStorage.productCart = JSON.stringify(Array.from(this.cart.products));
    this.cartSubject.next(this.cart);
  }

  deleteProductFromCart(product: ProductModel) {
    this.cart.products.delete(product);
    localStorage.productCart = JSON.stringify(Array.from(this.cart.products));
    this.cartSubject.next(this.cart);
  }

  get shoppingCart() {
    return this.cart;
  }

  getTotalShoppingCart() {
    let total = 0;
    for (const product of this.cart.products) {
      total = total + (product[0].price * product[1]);
    }
    for (const menu of this.cart.menus) {
      total = total + (menu[0].menu.price * menu[1]);
    }
    return total;
  }

  getRestaurant(restaurantId: any): Observable<RestaurantFullModel> {
    if (this.restaurant) {
      return of(this.restaurant);
    }
    return this.dataManagement.getResource<RestaurantFullModel>(
      this.orderURI + '/restaurant/' + restaurantId
    );
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }
}
