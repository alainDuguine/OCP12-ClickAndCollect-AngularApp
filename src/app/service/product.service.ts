import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ProductModel} from '../model/ProductModel';
import {tap} from 'rxjs/operators';
import {CategoryModel} from '../model/CategoryModel';
import {DataManagementService} from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  restaurantURI = '/restaurants/';
  productURI = '/products/';
  categoryURI = '/categories/';
  productsChange = new Subject<ProductModel[]>();
  private products: ProductModel[] = [];

  constructor(private dataManagement: DataManagementService) { }

  setProducts(products: ProductModel[]) {
    this.products = products;
    this.productsChange.next(this.products.slice());
  }

  fetchProduct(restaurantId: number, productId: number) {
    if (this.products.length === 0) {
      let product: ProductModel;
      this.dataManagement.getResource<ProductModel>(
        this.restaurantURI + restaurantId + this.productURI + productId
      ).subscribe(result => {
          product = result;
          return product;
        });
    } else {
      return this.products.find(el => el.id === productId);
    }
  }

  getProducts(restaurantId: number) {
    return this.dataManagement.getResource<ProductModel[]>(
      this.restaurantURI + restaurantId + this.productURI
    ).pipe(
      tap(products => {
        this.setProducts(products);
      })
    );
  }

  getProductsByCategory(restaurantId: number, category: string) {
    const params = new Map();
    params.set('category', category);
    return this.dataManagement.getResource<ProductModel[]>(
      this.restaurantURI + restaurantId + this.productURI,
      params
    );
  }

  getCategories(): Observable<any> {
    return this.dataManagement.getResource<CategoryModel[]>(this.categoryURI);
  }

  addProduct(restaurantId: number, product: ProductModel) {
    this.dataManagement.postResource<ProductModel>(
      this.restaurantURI + restaurantId + this.productURI, product
    ).subscribe(
      result => {
        this.products.push(result);
        this.productsChange.next(this.products.slice());
      });
  }

  updateProduct(restaurantId: number, productId: number, product: ProductModel) {
    this.dataManagement.putResource<ProductModel>(
      this.restaurantURI + restaurantId + this.productURI + productId,
      product
    ).subscribe(
      result => {
        const productInArray = this.products.find(el => el.id === productId);
        const index = this.products.indexOf(productInArray);
        this.products[index] = result;
        this.productsChange.next(this.products.slice());
      }
    );
  }

  deleteProduct(restaurantId: number, product: ProductModel) {
    const index = this.products.indexOf(product);
    return this.dataManagement.deleteResource<ProductModel>(
      this.restaurantURI + restaurantId + this.productURI + product.id)
      .subscribe( () => {
          this.products.splice(index, 1);
          this.productsChange.next(this.products.slice());
          return true;
        }, () => false);
  }
}
