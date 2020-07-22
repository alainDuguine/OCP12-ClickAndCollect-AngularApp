import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {MenuModel} from '../../model/MenuModel';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {RestaurantModel} from '../../model/RestaurantModel';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CategoryModel} from '../../model/CategoryModel';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {

  restaurant: RestaurantModel;
  products: ProductModel[];
  mapProducts = new Map<string, ProductModel[]>();
  menus: MenuModel[];
  categories: CategoryModel[];
  photoUrl: SafeUrl;
  isLoading = true;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  modalProduct: ProductModel;
  total: number;
  quantity = 1;
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const restaurantId = params.restaurantId;
      this.orderService.getRestaurant(restaurantId).subscribe(
        result => {
          this.initData(result);
        },
        error => this.router.navigate(['/error'])
      );
    });
  }

  initData(data: any) {
    this.restaurant = data.restaurant;
    this.restaurant.distance = this.orderService.getDistance();
    if (this.restaurant.photo) {
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(' http://127.0.0.1:8081'
        + this.restaurant.photo.split(':')[1]);
    }
    this.products = data.products;
    this.groupProductsByCategory(this.products);
    this.menus = data.menus;
    this.categories = data.categories;
    this.isLoading = false;
  }

  groupProductsByCategory(products: ProductModel[]) {
    this.mapProducts = new Map<string, ProductModel[]>();
    products.forEach(product => {
      if (!this.mapProducts.has(product.category)) {
        this.mapProducts.set(product.category, products.filter(data => data.category === product.category));
      }
    });
  }

  get productGrouped(): {[key: string]: ProductModel[]} {
    return this.mapProducts as unknown as {[key: string]: ProductModel[]} || {};
  }

  onOpenProduct(content: TemplateRef<any>, product: ProductModel) {
    this.modalService.open(content);
    this.modalProduct = product;
    this.total = this.modalProduct.price;
  }

  getAmount() {
    this.total = this.modalProduct.price * this.quantity;
  }

  addToCart(modalProduct: ProductModel) {
    console.log(modalProduct);
    this.modalService.dismissAll('Add');
  }

  onAdd() {
    this.quantity++;
    this.getAmount();
  }

  onRemove() {
    if (this.quantity > 1) {
      this.quantity--;
      this.getAmount();
    }
  }
}
