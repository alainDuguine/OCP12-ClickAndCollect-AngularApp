import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../../service/order.service';
import {CartModel} from '../../../model/CartModel';
import {Subscription} from 'rxjs';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MenuOrderModel} from '../../../model/MenuOrderModel';
import {ProductModel} from '../../../model/ProductModel';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCart: CartModel;
  private shoppingCartSub: Subscription;
  faMinus = faMinusCircle;
  faPlus = faPlusCircle;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.shoppingCart = this.orderService.shoppingCart;
    this.orderService.cartSubject.subscribe(
      (shoppingCart: CartModel) => this.shoppingCart = shoppingCart
    );
  }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
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

  onValidateOrder() {

  }
}
