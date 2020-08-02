import {ProductModel} from './ProductModel';
import {MenuModel} from './MenuModel';
import {RestaurantModel} from './RestaurantModel';

export class RestaurantFullModel {
  restaurant: RestaurantModel;
  products: ProductModel[];
  menus: MenuModel[];
}
