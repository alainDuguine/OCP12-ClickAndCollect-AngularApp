import {CategoryModel} from './CategoryModel';
import {ProductModel} from './ProductModel';

export class ProductInMenuModel {
  public product: ProductModel;
  public extraCost: number;

  constructor(product: ProductModel, extraCost: number) {
    this.product = product;
    this.extraCost = extraCost;
  }
}

export class CourseModel {
  public category: CategoryModel;
  public products: ProductInMenuModel[];

  constructor(category: CategoryModel, products: ProductInMenuModel[]) {
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
  public courses: CourseModel[];

  constructor(id: number, name: string, description: string, price: number, restaurantId: number, courses: CourseModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.restaurantId = restaurantId;
    this.courses = courses;
  }
}
