import {Injectable} from '@angular/core';
import {CourseModel, MenuModel, ProductInCourseModel} from '../model/MenuModel';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../model/ProductModel';
import {CourseForm, MenuForm, ProductInCourseForm} from '../model/MenuForm';
import {tap} from 'rxjs/operators';
import {DataManagementService} from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  restaurantURI = '/restaurants/';
  menuURI = '/menus/';

  menusChange = new Subject<MenuModel[]>();
  private menus: MenuModel[] = [
    { id : 1 ,
      name : 'Menu n°1',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ',
      price : 15,
      restaurantId: 1,
      menuCourses : [
        new CourseModel(
          'Entrée',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          'Plat',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        )]
    },
    { id : 2 ,
      name : 'Menu n°2',
      description : 'Description menu n°2',
      price : 14.5,
      restaurantId : 1,
      menuCourses : [
        new CourseModel(
          'Entrée',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6.5, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            5, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          'Plat',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          'Dessert',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        )]
    },
    {
      id: 3,
      name: 'Menu n°3',
      description: 'Description menu n°3',
      price: 13,
      restaurantId: 1,
      menuCourses: [
        new CourseModel(
          'Plat',
          [new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          'Dessert',
          [new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        )]
    },
    { id : 4 ,
      name : 'Menu n°4',
      description : 'Description menu n°4',
      price : 17.5,
      restaurantId : 1,
      menuCourses : [
        new CourseModel(
          'Entrée',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6.5, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              5, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          'Plat',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          'Boisson',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Boisson', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Boisson', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Boisson', 1),
            1
          )]
        )]},
    { id : 5 ,
      name : 'Menu n°5',
      description : 'Description menu n°5',
      price : 16,
      restaurantId : 1,
      menuCourses : [
        new CourseModel(
          'Plat',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          'Boisson',
          [ new ProductInCourseModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Boisson', 1),
            0
          ), new ProductInCourseModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Boisson', 1),
            2
          ), new ProductInCourseModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Boisson', 1),
            1
          )]
        )
      ]
    }
  ];

  constructor(private httpClient: HttpClient,
              private dataManagement: DataManagementService) { }

  private setMenus(menus: MenuModel[]) {
    this.menus = menus;
    this.menusChange.next(this.menus.slice());
  }

  fetchMenu(restaurantId: number, menuId: number) {
    if (this.menus.length === 0) {
      let menu: MenuModel;
      this.dataManagement.getResource<MenuModel>(this.restaurantURI + restaurantId + this.menuURI + menuId)
        .subscribe(result => {
          menu = result;
          return menu;
        });
    } else {
      return this.menus.find(el => el.id === menuId);
    }
  }

  // private getMenu(restaurantId: number, menuId: number) {
  //   return this.httpClient.get<MenuModel>(
  //     environment.api_url + this.restaurantURI + restaurantId + this.menuURI + menuId
  //   );
  // }

  getMenus(restaurantId: number) {
    // return this.httpClient.get<MenuModel[]>(
    //   environment.api_url + this.restaurantURI + restaurantId + this.menuURI
    // ).pipe(
    //   tap(menus => {
    //     this.setMenus(menus);
    //   })
    // );
    return this.dataManagement.getResource<MenuModel[]>(
      this.restaurantURI + restaurantId + this.menuURI
    ).pipe(
      tap(menus => {
        this.setMenus(menus);
      })
    );
  }

  addMenu(restaurantId: number, menu: MenuModel) {
    const menuForm = this.formatMenu(menu);
    // this.postMenu(restaurantId, menuForm).subscribe(
    //   result => {
    //     this.menus.push(result);
    //     this.menusChange.next(this.menus.slice());
    //   }
    // );
    this.dataManagement.postResource<MenuForm>(
      this.restaurantURI + restaurantId + this.menuURI,
      menuForm).subscribe(
      result => {
        this.menus.push(result);
        this.menusChange.next(this.menus.slice());
      }
    );
  }

  // postMenu(restaurantId: number, menu: MenuForm) {
  //   return this.httpClient.post<MenuModel>(
  //     environment.api_url + this.restaurantURI + restaurantId + this.menuURI, menu
  //   );
  // }

  updateMenu(restaurantId: number, menuId: number, menu: MenuModel) {
    const menuForm = this.formatMenu(menu);
    // this.putMenu(restaurantId, menuId, menuForm).subscribe(
    //   result => {
    //     const menuInArray = this.menus.find(el => el.id === menuId);
    //     const index = this.menus.indexOf(menuInArray);
    //     this.menus[index] = result;
    //     this.menusChange.next(this.menus.slice());
    //   }
    // );
    this.dataManagement.putResource<MenuForm>(
      this.restaurantURI + restaurantId + this.menuURI + menuId,
      menuForm).subscribe(
      result => {
        const menuInArray = this.menus.find(el => el.id === menuId);
        const index = this.menus.indexOf(menuInArray);
        this.menus[index] = result;
        this.menusChange.next(this.menus.slice());
      }
    );
  }

  // private putMenu(restaurantId: number, menuId: number, menu: MenuForm) {
  //   return this.httpClient.put<MenuModel>(
  //     environment.api_url + this.restaurantURI + restaurantId + this.menuURI + menuId,
  //     menu);
  // }

  deleteMenu(restaurantId: number, menu: MenuModel) {
    const index = this.menus.indexOf(menu);
    // return this.httpClient.delete(
    //   environment.api_url + this.restaurantURI + restaurantId + this.menuURI + menu.id)
    //   .subscribe(() => {
    //     this.menus.splice(index, 1);
    //     this.menusChange.next(this.menus.slice());
    //     return true;
    //   }, () => false);
    return this.dataManagement.deleteResource<MenuModel>(
      this.restaurantURI + restaurantId + this.menuURI + menu.id)
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
