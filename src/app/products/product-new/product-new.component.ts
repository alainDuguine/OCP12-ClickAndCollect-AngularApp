import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from '../../service/product.service';

interface Category {
  name: string;
}

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  @ViewChild('f') productForm: NgForm;
  categories: Category[];
  newProduct: ProductModel;
  description: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.productService.getResource('/products/categories').subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
        this.categories = [];
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log('Submitted');
    console.log(this.productForm.value);
    this.newProduct = form.value;
    console.log(this.newProduct);
  }

  onClear() {
    console.log('resetting');
    this.productForm.reset();
  }

}
