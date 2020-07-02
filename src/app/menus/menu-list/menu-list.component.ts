import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../service/menu.service';
import {Subscription} from 'rxjs';
import {MenuModel} from '../../model/MenuModel';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {

  private menuListSubscription: Subscription;
  menus: MenuModel[];

  restaurantId = 1;

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.menuListSubscription = this.menuService.menusChange
      .subscribe(menus => {
        this.menus = menus;
      });
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params.restaurantId;
      this.menuService.getMenus(this.restaurantId)
        .subscribe(menus => this.menus = menus);
    });
  }

  ngOnDestroy(): void {
    this.menuListSubscription.unsubscribe();
  }
}
