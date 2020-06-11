import {Component, OnInit} from '@angular/core';
import {faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuModel} from '../../model/MenuModel';
import {CategoryModel} from '../../model/CategoryModel';
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
  restaurantId = 1;
  menuId: number;
  categories: CategoryModel[];

  editMode = false;
  buttonSubmitLabel = 'Enregistrer';
  buttonResetLabel = 'Réinitialiser';
  titleMenuForm = 'Ajouter un nouveau menu';
  faClose = faTimesCircle;
  faAdd = faPlusCircle;
  productsByCategory: ProductModel[] = [];
  productSelectionValid: boolean[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private menuService: MenuService) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.menuId = +params.menuId;
      this.editMode = params.menuId != null;
    });
    if (this.editMode) {
      this.initFormEdit();
    } else {
      this.initFormNew();
    }
  }

  private getCategories() {
    this.productService.getCategories().subscribe(
      result => {
        this.categories = result;
      });
  }

  initFormEdit() {
    let name: string;
    let description: string;
    let price;
    const menuCoursesArray = new FormArray([]);
    let courseProductsArray = new FormArray([]);

    this.buttonSubmitLabel = 'Modifier';
    this.buttonResetLabel = 'Annuler';
    this.titleMenuForm = 'Modifier un menu';
    this.menu = this.menuService.fetchMenu(this.restaurantId, this.menuId);
    name = this.menu.name;
    description = this.menu.description;
    price = this.menu.price;
    // initialize menuCourses and products
    if (this.menu.menuCourses) {
      // initialize course in menu
      for (const course of this.menu.menuCourses) {
        const productsInCourse = course.productsInCourse;
        this.productService.getProductsByCategory(this.restaurantId, course.category)
          .subscribe((products) => {
              courseProductsArray = new FormArray([]);
              this.productsByCategory = products;
              if (this.productsByCategory) {
                this.productsByCategory.forEach(
                  (product) => {
                    const productForm: FormGroup = this.initProduct();
                    const check = productsInCourse.some((productInCourse) => productInCourse.product.id === product.id);
                    if (check) {
                      product.added = true;
                    }
                    productForm.controls.product.setValue(product);
                    courseProductsArray.push(productForm);
                  }
                );
              }
              menuCoursesArray.push(new FormGroup({
              category: new FormControl(course.category, Validators.required),
              productsInCourse: courseProductsArray
            }));
            }
          );
      }
    }

    this.menuForm = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(description, Validators.maxLength(255)),
      price: new FormControl(price, [Validators.required, Validators.min(0)]),
      menuCourses: menuCoursesArray
    });
  }

  private initFormNew() {
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
      this.productService.getProductsByCategory(this.restaurantId, course)
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
          }
        );
    }
  }

  onRemoveCourse(i: number) {
    const controls = this.menuForm.get('menuCourses') as FormArray;
    console.log(controls.length);
    if (controls.length > 1) {
      controls.removeAt(i);
    }
    this.menuForm.markAsDirty();
  }

  onSubmit() {
    this.menu = this.menuForm.value;
    if (this.editMode) {
      this.menuService.updateMenu(this.restaurantId, this.menuId, this.menu);
      alert('Menu modifié');
    } else {
      this.menuService.addMenu(this.restaurantId, this.menu);
      alert('Menu ajouté');
    }
    this.onClose();

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClear() {
    if (this.editMode) {
      this.initFormEdit();
    } else {
      this.initFormNew();
    }
  }

  getCourses(form) {
    return form.get('menuCourses').controls;
  }

  getProducts(form) {
    return form.get('productsInCourse').controls;
  }

  onSelectProduct(product, courseNumber: number) {
    product.value.product.added = !product.value.product.added;
    this.menuForm.markAsDirty();
    const products = (this.menuForm.get('menuCourses')as FormArray).at(courseNumber).value.productsInCourse;
    this.productSelectionValid[courseNumber] = products.some(el => el.product.added);
  }

}
