import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductModel;
  @Input() index: number;
  @Input() lastChild: boolean;
  faEdit = faEdit;
  faDelete = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit() {
    // alert('Edit');
  }

  onDelete() {
    // alert('Delete');
  }

  onSelect() {
    // product detail
  }
}
