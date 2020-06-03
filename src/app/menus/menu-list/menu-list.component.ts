import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../service/menu.service';
import {Subscription} from 'rxjs';
import {MenuModel} from '../../model/MenuModel';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {

  private menuListSubscription: Subscription;
  menus: MenuModel[];

  @Input() private idRestaurant = 1;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuListSubscription = this.menuService.menusChange
      .subscribe(menus => {
        this.menus = menus;
      });
    this.menuService.getMenus(this.idRestaurant)
      .subscribe(menus => this.menus = menus);
    console.log(this.menus);
  }

  ngOnDestroy(): void {
    this.menuListSubscription.unsubscribe();
  }
}
