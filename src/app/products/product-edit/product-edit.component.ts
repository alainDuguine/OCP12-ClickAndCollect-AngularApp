import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {CategoryModel} from '../../model/CategoryModel';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @ViewChild('f') productForm: NgForm;
  product: ProductModel;
  categories: CategoryModel[];
  defaultCategory = 'Entrée';
  idRestaurant = 1;
  idProduct: number;
  descriptionInput: string;
  nameInput: string;
  editMode = false;
  buttonSubmitLabel = 'Enregistrer';
  buttonResetLabel = 'Réinitialiser';
  faClose = faTimesCircle;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.idProduct = +params.idProduct;
      this.editMode = params.idProduct != null;
      if (this.editMode) {
        this.initForm();
      }
    });
  }

  private getCategories() {
    this.productService.getCategories().subscribe(
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
    this.product = this.productForm.value;
    if (this.editMode) {
      this.product.id = this.idProduct;
      this.productService.updateProduct(this.idRestaurant, this.product);
      this.onClose();
    } else {
      this.productService.addProduct(this.idRestaurant, this.product);
      this.onClose();
    }

  }

  onClear() {
    if (this.editMode) {
      this.initForm();
    } else {
      this.productForm.reset();
      this.productForm.controls.category.patchValue('Entrée');
    }
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editMode) {
      this.buttonSubmitLabel = 'Modifier';
      this.buttonResetLabel = 'Annuler';
      this.productService.fetchProduct(this.idProduct)
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
            });
        });
    }
  }
}
