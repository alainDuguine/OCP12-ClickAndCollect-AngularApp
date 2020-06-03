import {Component, OnInit, ViewChild} from '@angular/core';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {NgForm} from '@angular/forms';
import {MenuModel} from '../../model/MenuModel';
import {MenuService} from '../../service/menu.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  @ViewChild('f') menuForm: NgForm;
  menu: MenuModel;

  idRestaurant = 1;
  nameInput: any;
  descriptionInput: any;

  editMode = false;
  buttonSubmitLabel = 'Enregistrer';
  buttonResetLabel = 'Réinitialiser';
  faClose = faTimesCircle;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private menuService: MenuService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.menu = this.menuForm.value;
    if (this.editMode) {
      console.log('update menu');
    } else {
      console.log('Adding menu');
      this.menuService.addMenu(this.idRestaurant, this.menu);
    }
  }

  onClear() {
    if (this.editMode) {
      this.initForm();
    } else {
      this.menuForm.reset();
    }
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editMode) {
      this.buttonSubmitLabel = 'Modifier';
      this.buttonResetLabel = 'Annuler';
      // this.productService.fetchProduct(this.idProduct)
      //   .subscribe(result => {
      //     this.product = result;
      //     setTimeout(
      //       () => {
      //         this.productForm.setValue({
      //           name: this.product.name,
      //           category: this.product.category,
      //           description: this.product?.description,
      //           price: this.product.price,
      //           imageUrl: this.product?.imageUrl
      //         });
      //         this.productForm.form.markAsPristine();
      //       });
      //   });
    }
  }
}
