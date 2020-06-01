import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';

interface Category {
  name: string;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @ViewChild('f') productForm: NgForm;
  idRestaurant = 1;
  categories: Category[];
  defaultCategory = 'Entrée';
  newProduct: ProductModel;
  descriptionInput: string;
  nameInput: string;
  faClose = faTimesCircle;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

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
    this.productService.addProduct(url, this.newProduct);
    this.onClose();
  }

  onClear() {
    console.log('resetting');
    console.log(this.productForm);
    this.productForm.reset();
    this.productForm.controls.category.patchValue('Entrée');
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
