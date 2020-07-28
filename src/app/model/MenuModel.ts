import {ProductModel} from './ProductModel';

export class ProductInCourseModel {
  public id: number;
  public product: ProductModel;
  public extraCost: number;

  constructor(product: ProductModel, extraCost: number) {
    this.product = product;
    this.extraCost = extraCost;
  }
}

export class CourseModel {
  public id: number;
  public category: string;
  public productsInCourse: ProductInCourseModel[];

  constructor(category: string, products: ProductInCourseModel[]) {
    this.category = category;
    this.productsInCourse = products;
  }
}

export class MenuModel {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public restaurantId: number;
  public menuCourses: CourseModel[];

  constructor(id: number, name: string, description: string, price: number, restaurantId: number, courses: CourseModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.restaurantId = restaurantId;
    this.menuCourses = courses;
  }
}
