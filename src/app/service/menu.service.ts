import {Injectable} from '@angular/core';
import {CourseModel, MenuModel, ProductInMenuModel} from '../model/MenuModel';
import {of, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../model/CategoryModel';
import {ProductModel} from '../model/ProductModel';

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
      courses : [
        new CourseModel(
          new CategoryModel('Entrée'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Plat'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
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
      courses : [
        new CourseModel(
          new CategoryModel('Entrée'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6.5, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            5, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Plat'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
            12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Dessert'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
            5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
            6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
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
      courses: [
        new CourseModel(
          new CategoryModel('Plat'),
          [new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Dessert'),
          [new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
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
      courses : [
        new CourseModel(
          new CategoryModel('Entrée'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Entrée', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6.5, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Entrée', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              5, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Entrée', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Plat'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Boisson'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Boisson', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Boisson', 1),
            2
          ), new ProductInMenuModel(
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
      courses : [
        new CourseModel(
          new CategoryModel('Plat'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              10, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Plat', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              11, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Plat', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              12, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Plat', 1),
            1
          )]
        ),
        new CourseModel(
          new CategoryModel('Boisson'),
          [ new ProductInMenuModel(
            new ProductModel(1, 'Nom produit 1', 'Description produit 1',
              5, 'https://assets.afcdn.com/recipe/20190529/93192_w600cxt0cyt0cxb5760cyb3840.jpg', 'Boisson', 1),
            0
          ), new ProductInMenuModel(
            new ProductModel(2, 'Nom produit 2', 'Description produit 2',
              6, 'https://assets.afcdn.com/recipe/20190704/94706_w600cxt0cyt0cxb4256cyb2832.jpg', 'Boisson', 1),
            2
          ), new ProductInMenuModel(
            new ProductModel(3, 'Nom produit 3', 'Description produit 3',
              7, 'https://assets.afcdn.com/recipe/20150814/642_w600.jpg', 'Boisson', 1),
            1
          )]
        )
      ]
    }
  ];

  constructor(private httpClient: HttpClient) { }

  getMenus(idRestaurant: number) {
    // return this.httpClient.get<MenuModel[]>(
    //   environment.api_url + this.restaurantURI + idRestaurant + this.menuURI
    // ).pipe(
    //   tap(menus => {
    //     this.setMenus(menus);
    //   })
    // );
    return of(this.menus);
  }

  addMenu(idRestaurant: number, menu: MenuModel) {
    this.menus.push(menu);
    console.log(this.menus);
    this.menusChange.next(this.menus.slice());
    // this.postMenu(idRestaurant, menu).subscribe(
    //   result => {
    //     this.menus.push(result);
    //     this.menusChange.next(this.menus.slice());
    //   });
  }

  postMenu(idRestaurant: number, menu: MenuModel) {
    return this.httpClient.post<MenuModel>(
      environment.api_url + this.restaurantURI + idRestaurant + this.menuURI, menu
    );
  }

  private setMenus(menus: MenuModel[]) {
    this.menus = menus;
    this.menusChange.next(this.menus.slice());
  }
}
