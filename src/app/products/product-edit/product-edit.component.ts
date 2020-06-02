import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {Subscription} from 'rxjs';

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
  product: ProductModel;
  categories: Category[];
  defaultCategory = 'Entrée';
  idRestaurant = 1;
  idProduct: number;
  descriptionInput: string;
  nameInput: string;
  faClose = faTimesCircle;
  editMode = false;
  editSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.idProduct = +params.idProduct;
      console.log(this.idProduct);
      this.editMode = params.idProduct != null;
      console.log(this.editMode);
      if (this.editMode) {
        this.initForm();
      }
    });
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
    this.product = this.productForm.value;
    this.productService.addProduct(url, this.product);
    this.onClose();
  }

  onClear() {
    this.productForm.reset();
    this.productForm.controls.category.patchValue('Entrée');
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editMode) {
      this.productService.getProduct(this.idProduct)
        .subscribe(result => {
          this.product = result;
          setTimeout(
            () => {
              this.productForm.setValue({
                name: this.product.name,
                category: this.product.category,
                description: this.product?.description,
                price: this.product.price,
                imageUrl: this.product?.imageUrl
              });
              this.productForm.form.markAsPristine();
              console.log(this.productForm);
            });
        });
    }
  }
}
