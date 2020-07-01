import {Component, Input, OnInit} from '@angular/core';
import {MenuModel} from '../../../model/MenuModel';
import {faChevronDown, faChevronRight, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {MenuService} from '../../../service/menu.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menu: MenuModel;
  @Input() restaurantId = 1;
  @Input() firstChild: boolean;
  faDelete = faTrashAlt;
  faUpdate = faEdit;
  faCollapse = faChevronRight;
  dropped = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) { }

  ngOnInit(): void {
  }

  onDelete() {
    if (confirm('Vous allez supprimer le menu "' + this.menu.name + '"\nde manière irréversible.\nVeuillez confirmer votre choix')) {
      if (this.menuService.deleteMenu(this.restaurantId, this.menu)) {
        alert('Suppression effectuée');
        if (this.route.snapshot.paramMap) {
          this.router.navigate(['./'], {relativeTo: this.route});
        }
      } else {
        alert('La suppression a échouée');
      }
    }
  }

  onUpdate() {
    alert('update');
  }

  swapIcon() {
    if (this.faCollapse === faChevronRight) {
      this.dropped = true;
      this.faCollapse = faChevronDown;
    } else {
      this.dropped = false;
      this.faCollapse = faChevronRight;
    }
  }
}
