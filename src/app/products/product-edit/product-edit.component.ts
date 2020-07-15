import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../model/ProductModel';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {CategoryModel} from '../../model/CategoryModel';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @ViewChild('f') productForm: NgForm;
  product: ProductModel;
  categories: CategoryModel[];
  restaurantId: number;
  productId: number;
  descriptionInput: string;
  nameInput: string;
  editMode = false;
  buttonSubmitLabel = 'Enregistrer';
  buttonResetLabel = 'Réinitialiser';
  titleProductForm = 'Ajouter un nouveau produit';
  faClose = faTimesCircle;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.route.params.subscribe((params: Params) => {
          this.productId = +params.productId;
          this.editMode = params.productId != null;
          if (this.editMode) {
            this.initFormEdit();
          }
        });
      }
    );
    this.restaurantId = this.authService.currentUserValue.id;
  }

  private initFormEdit() {
    this.titleProductForm = 'Modifier un produit';
    this.buttonSubmitLabel = 'Modifier';
    this.buttonResetLabel = 'Annuler';
    this.product = this.productService.fetchProduct(this.restaurantId, this.productId);
    setTimeout(
      () => {
        this.productForm.form.patchValue({
          name: this.product.name,
          category: this.product.category,
          price: this.product.price,
          description: this.product.description,
          imageUrl: this.product.imageUrl});
        this.productForm.form.markAsPristine();
      });
  }

  onSubmit() {
    this.product = this.productForm.value;
    if (this.editMode) {
      this.productService.updateProduct(this.restaurantId, this.productId, this.product);
      this.onClose();
    } else {
      console.log(this.restaurantId);
      this.productService.addProduct(this.restaurantId, this.product);
      this.onClose();
    }

  }

  onClear() {
    if (this.editMode) {
      this.initFormEdit();
    } else {
      this.productForm.reset();
    }
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
