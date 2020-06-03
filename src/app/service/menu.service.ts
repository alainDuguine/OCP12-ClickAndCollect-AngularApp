import {Injectable} from '@angular/core';
import {MenuModel} from '../model/MenuModel';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  restaurantURI = '/restaurants/';
  menuURI = '/menus/';

  menusChange = new Subject<MenuModel[]>();
  private menus: MenuModel[];

  constructor(private httpClient: HttpClient) { }

  addMenu(idRestaurant: number, menu: MenuModel) {
    this.postMenu(idRestaurant, menu).subscribe(
      result => {
        this.menus.push(result);
        this.menusChange.next(this.menus.slice());
      });
  }

  postMenu(idRestaurant: number, menu: MenuModel) {
    return this.httpClient.post<MenuModel>(
      environment.api_url + this.restaurantURI + idRestaurant + this.menuURI, menu
    );
  }
}
