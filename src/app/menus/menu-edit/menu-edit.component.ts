import {Component, OnInit} from '@angular/core';
import {faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuModel} from '../../model/MenuModel';
import {CategoryModel} from '../../model/CategoryModel';
import {faSearchengin} from '@fortawesome/free-brands-svg-icons';
import {ProductModel} from '../../model/ProductModel';
import {MenuService} from '../../service/menu.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  menuForm: FormGroup;
  menu: MenuModel;
  idRestaurant = 1;
  categories: CategoryModel[];

  editMode = false;
  buttonSubmitLabel = 'Enregistrer';
  buttonResetLabel = 'Réinitialiser';
  faClose = faTimesCircle;
  faAdd = faPlusCircle;
  faSearch = faSearchengin;
  productsByCategory: ProductModel[] = [];
  productSelectionValid: boolean[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private menuService: MenuService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(
      result => {
        this.categories = result;
      });
    this.initForm();
  }

  initForm() {
    // let name = '';
    // let description = '';
    // let price;
    // const menuCourses = new FormArray([]);
    // const courseProducts = new FormArray([]);
    //
    // if (this.editMode) {
    //   this.buttonSubmitLabel = 'Modifier';
    //   this.buttonResetLabel = 'Annuler';
    //   name = this.menu.name;
    //   description = this.menu.description;
    //   price = this.menu.price;
    //   if (this.menu.courses) {
    //     for (const course of this.menu.courses) {
    //       menuCourses.push(new FormGroup({
    //           courseName: new FormControl(course.category.name, Validators.required)
    //         })
    //       );
    //     }
    //   }
    // }

    this.menuForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', Validators.maxLength(255)),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      menuCourses: new FormArray([
        this.initCourse(),
      ])
    });
  }

  initCourse() {
    return new FormGroup({
      category: new FormControl(),
      productsInCourse: new FormArray([])
    });
  }

  initProduct() {
    return new FormGroup({
      product: new FormControl()
    });
  }

  onAddCourse() {
    const control = this.menuForm.get('menuCourses') as FormArray;
    control.push(this.initCourse());
    console.log(control.length);
    this.productSelectionValid[control.length - 1] = false;
  }

  onLoadProducts(form: FormArray, i: number) {
    const courseControl = this.menuForm.get('menuCourses') as FormArray;
    const course = courseControl.at(i).get('category').value;
    const control = courseControl.at(i).get('productsInCourse') as FormArray;
    control.clear();
    if (course) {
      this.productService.getProductsByCategory(this.idRestaurant, course)
        .subscribe((products) => {
            this.productsByCategory = products;
            if (this.productsByCategory) {
              this.productsByCategory.forEach(
                (product) => {
                  const productForm: FormGroup = this.initProduct();
                  productForm.controls.product.setValue(product);
                  control.push(productForm);
                }
              );
            }
          });
    }
  }

  onRemoveCourse(i: number) {
    const controls = this.menuForm.get('menuCourses') as FormArray;
    console.log(controls.length);
    if (controls.length > 1) {
      controls.removeAt(i);
    }
  }

  onSubmit() {
    const menu: MenuModel = this.menuForm.value;
    console.log(menu);
    this.menuService.addMenu(this.idRestaurant, menu);
    alert('Menu ajouté');
    this.onClose();
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClear() {
    this.initForm();
  }

  getCourses(form) {
    return form.get('menuCourses').controls;
  }

  getProducts(form) {
    return form.get('productsInCourse').controls;
  }

  onSelectProduct(product, courseNumber: number) {
    product.value.product.added = !product.value.product.added;
    const products = (this.menuForm.get('menuCourses')as FormArray).at(courseNumber).value.productsInCourse;
    this.productSelectionValid[courseNumber] = products.some(el => el.product.added);
  }
}
