import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() idRestaurant = 1;
  products: ProductModel[];

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts(this.idRestaurant).subscribe(
      data => {
        this.products = data;
        console.log(typeof this.products);
        console.log(data);
      },
      error => {
        console.log(error);
        this.products = [];
      }
    );
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
