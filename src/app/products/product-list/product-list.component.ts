import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  restaurantId: number;
  private productListSubscription: Subscription;
  products: ProductModel[];
  mapProducts = new Map<string, ProductModel[]>();
  faAdd = faPlusCircle;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productListSubscription = this.productService.productsChange
      .subscribe(products => {
        this.products = products;
        this.groupByCategory(this.products);
      });
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params.restaurantId;
      this.productService.getProducts(this.restaurantId)
        .subscribe(products => this.groupByCategory(products)
        );
    });
  }

  groupByCategory(products: ProductModel[]) {
    this.mapProducts = new Map<string, ProductModel[]>();
    products.forEach(product => {
      if (!this.mapProducts.has(product.category)) {
        this.mapProducts.set(product.category, products.filter(data => data.category === product.category));
      }
    });
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }

  get productGroups(): {[key: string]: ProductModel[]} {
    return this.mapProducts as unknown as {[key: string]: ProductModel[]} || {};
  }

}
