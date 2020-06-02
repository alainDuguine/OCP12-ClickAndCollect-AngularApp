import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @Input() category;
  @Input() products: ProductModel[];
  faCollapse = faChevronRight;
  dropped = false;

  constructor() { }

  ngOnInit(): void {
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
