export class OrderModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pickupDateTime: string;
  menuOrders: MenuOrder[];
  productOrders: ProductOrder[];

  constructor() {
    this.menuOrders = [];
    this.productOrders = [];
  }
}

export class MenuOrder {
  menuId: number;
  selectedProducts: SelectedProduct[];
  quantity: number;

  constructor(menuId: number, quantity: number) {
    this.menuId = menuId;
    this.quantity = quantity;
    this.selectedProducts = [];
  }
}

export class SelectedProduct {
  productId: number;

  constructor(productId: number) {
    this.productId = productId;
  }
}

export class ProductOrder {
  productId: number;
  quantity: number;

  constructor(id: number, quantity: number) {
    this.productId = id;
    this.quantity = quantity;
  }
}
