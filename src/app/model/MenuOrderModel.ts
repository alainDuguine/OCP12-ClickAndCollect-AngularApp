import {CourseModel, MenuModel, ProductInCourseModel} from './MenuModel';

export class MenuOrderModel {
  public id: number;
  public menu: MenuModel;
  public selectedProducts: Map<CourseModel, ProductInCourseModel>;

  constructor() {
    this.selectedProducts = new Map<CourseModel, ProductInCourseModel>();
  }
}
