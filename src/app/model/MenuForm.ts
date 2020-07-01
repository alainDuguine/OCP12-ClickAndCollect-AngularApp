export class ProductInCourseForm {
  public productId: number;
  public extraCost: number;
}

export class CourseForm {
  public category: string;
  public productsInCourse: ProductInCourseForm[];

}

export class MenuForm {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public menuCourses: CourseForm[];

}
