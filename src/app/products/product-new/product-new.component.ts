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
  idRestaurant = 1;
  categories: Category[];
  defaultCategory = 'Entrée';
  newProduct: ProductModel;
  descriptionInput: string;
  nameInput: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.productService.getResource('/categories').subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
        this.categories = [];
      }
    );
  }

  onSubmit() {
    const url = '/restaurants/' + this.idRestaurant + '/products';
    this.newProduct = this.productForm.value;
    console.log(this.newProduct);
    this.productService.postResource(url, this.newProduct)
      .subscribe(data => {
        console.log('Product saved !');
        console.log(data);
        this.onClear();
      });
  }

  onClear() {
    console.log('resetting');
    console.log(this.productForm);
    this.productForm.reset();
    this.productForm.controls.category.patchValue('Entrée');
  }

}
