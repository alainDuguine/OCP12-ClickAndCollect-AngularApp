import {CategoryModel} from './CategoryModel';
import {ProductModel} from './ProductModel';

class ProductInMenu {
  public product: ProductModel;
  public extraCost: number;

  constructor(product: ProductModel, extraCost: number) {
    this.product = product;
    this.extraCost = extraCost;
  }
}

class Course {
  public category: CategoryModel;
  public products: ProductInMenu[];

  constructor(category: CategoryModel, products: ProductInMenu[]) {
    this.category = category;
    this.products = products;
  }
}

export class MenuModel {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public restaurantId: number;
  public courses: Course[];

  constructor(id: number, name: string, description: string, price: number, restaurantId: number, courses: Course[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.restaurantId = restaurantId;
    this.courses = courses;
  }
}
