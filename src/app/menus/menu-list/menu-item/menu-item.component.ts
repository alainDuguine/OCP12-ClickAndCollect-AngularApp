import {Component, Input, OnInit} from '@angular/core';
import {MenuModel} from '../../../model/MenuModel';
import {faChevronDown, faChevronRight, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menu: MenuModel;
  @Input() firstChild: boolean;
  faDelete = faTrashAlt;
  faUpdate = faEdit;
  faCollapse = faChevronRight;
  dropped = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    alert('delete');
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
