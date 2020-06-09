import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../model/ProductModel';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductModel;
  @Input() restaurantId = 1;
  @Input() index: number;
  @Input() lastChild: boolean;
  faDelete = faTrashAlt;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    if (confirm('Vous allez supprimer le produit "' + this.product.name + '"\nde manière irréversible.\nVeuillez confirmer votre choix')) {
      if (this.productService.deleteProduct(this.restaurantId, this.product)) {
        alert('Suppression effectuée');
        if (this.route.snapshot.paramMap) {
          this.router.navigate(['./'], {relativeTo: this.route});
        }
      } else {
        alert('La suppression a échouée');
      }
    }
  }
}
