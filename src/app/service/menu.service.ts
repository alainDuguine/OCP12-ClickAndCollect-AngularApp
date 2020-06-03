import {Injectable} from '@angular/core';
import {MenuModel} from '../model/MenuModel';
import {of, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  restaurantURI = '/restaurants/';
  menuURI = '/menus/';

  menusChange = new Subject<MenuModel[]>();
  private menus: MenuModel[] = [
    { id : 1 , name : 'Menu n°1', description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ', price : 15, courses : [], restaurantId : 1 },
    { id : 2 , name : 'Menu n°2', description : 'Description menu n°2', price : 14.5, courses : [], restaurantId : 1 },
    { id : 3 , name : 'Menu n°3', description : 'Description menu n°3', price : 13, courses : [], restaurantId : 1 },
    { id : 4 , name : 'Menu n°4', description : 'Description menu n°4', price : 17.5, courses : [], restaurantId : 1 },
    { id : 5 , name : 'Menu n°5', description : 'Description menu n°5', price : 16, courses : [], restaurantId : 1 }
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
