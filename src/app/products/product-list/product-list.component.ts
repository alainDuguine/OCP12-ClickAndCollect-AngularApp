import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() idRestaurant = 1;
  private productListSubscription: Subscription;
  products: ProductModel[];

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productListSubscription = this.productService.productsChange
      .subscribe(
        (products: ProductModel[]) => this.products = products
      );
    this.productService.getProducts(this.idRestaurant).subscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }
}
