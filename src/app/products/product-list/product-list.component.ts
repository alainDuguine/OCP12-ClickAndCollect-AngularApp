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
  mapProducts: Map<string, ProductModel[]> = new Map();

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // TODO check quand on ajoute une entrée, on met à jour la liste et on relance le tri de la map
    this.productListSubscription = this.productService.productsChange
      .subscribe(
        (products: ProductModel[]) => {
          this.products = products;
          this.groupByCategory(this.products);
          console.log(this.mapProducts);
        }
  );
    this.getProductsByCategory();
  }

  private getProductsByCategory() {
    this.productService.getProducts(this.idRestaurant)
      .subscribe(products => this.groupByCategory(products));
    console.log(this.mapProducts);
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }

  groupByCategory(products: ProductModel[]) {
    this.mapProducts = new Map();
    products.forEach(product => {
      if (!this.mapProducts.has(product.category)) {
        this.mapProducts.set(product.category, this.products.filter(data => data.category === product.category ));
      }
    });
  }

}
