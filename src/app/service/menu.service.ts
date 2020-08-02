import {Injectable} from '@angular/core';
import {MenuModel} from '../model/MenuModel';
import {Subject} from 'rxjs';
import {CourseForm, MenuForm, ProductInCourseForm} from '../model/MenuForm';
import {tap} from 'rxjs/operators';
import {DataManagementService} from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  restaurantURI = '/restaurants';
  menuURI = '/menus';

  menusChange = new Subject<MenuModel[]>();
  private menus: MenuModel[] = [];

  constructor(private dataManagement: DataManagementService) { }

  private setMenus(menus: MenuModel[]) {
    this.menus = menus;
    this.menusChange.next(this.menus.slice());
  }

  fetchMenu(restaurantId: number, menuId: number) {
    if (this.menus.length === 0) {
      let menu: MenuModel;
      this.dataManagement.getResource<MenuModel>(
        this.restaurantURI + '/' + restaurantId + this.menuURI + '/' + menuId
      ).subscribe(result => {
          menu = result;
          return menu;
        });
    } else {
      return this.menus.find(el => el.id === menuId);
    }
  }

  getMenus(restaurantId: number) {
    return this.dataManagement.getResource<MenuModel[]>(
      this.restaurantURI + '/' + restaurantId + this.menuURI
    ).pipe(
      tap(menus => {
        this.setMenus(menus);
      })
    );
  }

  addMenu(restaurantId: number, menu: MenuModel) {
    const menuForm = this.formatMenu(menu);
    this.dataManagement.postResource<MenuForm>(
      this.restaurantURI + '/' + restaurantId + this.menuURI,
      menuForm
    ).subscribe(
      result => {
        this.menus.push(result);
        this.menusChange.next(this.menus.slice());
      }
    );
  }

  updateMenu(restaurantId: number, menuId: number, menu: MenuModel) {
    const menuForm = this.formatMenu(menu);
    this.dataManagement.putResource<MenuForm>(
      this.restaurantURI + '/' + restaurantId + this.menuURI + '/' + menuId,
      menuForm
    ).subscribe(
      result => {
        const menuInArray = this.menus.find(el => el.id === menuId);
        const index = this.menus.indexOf(menuInArray);
        this.menus[index] = result;
        this.menusChange.next(this.menus.slice());
      }
    );
  }

  deleteMenu(restaurantId: number, menu: MenuModel) {
    const index = this.menus.indexOf(menu);
    return this.dataManagement.deleteResource<MenuModel>(
      this.restaurantURI + '/' + restaurantId + this.menuURI + '/' + menu.id)
      .subscribe(() => {
        this.menus.splice(index, 1);
        this.menusChange.next(this.menus.slice());
        return true;
      }, () => false);
  }

  private formatMenu(menu: MenuModel) {
    const menuForm = new MenuForm();
    menuForm.name = menu.name;
    menuForm.description = menu.description;
    menuForm.price = menu.price;
    menuForm.menuCourses = [];

    const menuCourses = menu.menuCourses;
    menuCourses.forEach(menuCourse => {
      const course = new CourseForm();
      course.category = menuCourse.category;
      course.productsInCourse = [];
      menuCourse.productsInCourse = menuCourse.productsInCourse
          .filter( p => p.product.added );

      menuCourse.productsInCourse.forEach(productInCourse => {
        const productInCourseForm = new ProductInCourseForm();
        productInCourseForm.productId = productInCourse.product.id;
        productInCourseForm.extraCost = productInCourse.extraCost;
        course.productsInCourse.push(productInCourseForm);
      });
      menuForm.menuCourses.push(course);
    });
    return menuForm;
  }
}
