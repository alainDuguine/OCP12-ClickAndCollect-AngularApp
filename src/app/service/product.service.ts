import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {ProductModel} from '../model/ProductModel';
import {tap} from 'rxjs/operators';
import {CategoryModel} from '../model/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  restaurantURI = '/restaurants/';
  productURI = '/products/';
  categoryURI = '/categories/';
  productsChange = new Subject<ProductModel[]>();
  private products: ProductModel[] = [];

  constructor(private httpClient: HttpClient) { }

  setProducts(products: ProductModel[]) {
    this.products = products;
    this.productsChange.next(this.products.slice());
  }

  addProduct(restaurantId: number, product: ProductModel) {
    this.postProduct(restaurantId, product).subscribe(
      result => {
        this.products.push(result);
        this.productsChange.next(this.products.slice());
      });
  }

  fetchProduct(idProduct: number) {
    if (this.products.length === 0) {
      return this.getProduct(1, idProduct);
    } else {
      return of(this.products.find(el => el.id === idProduct));
    }
  }

  updateProduct(restaurantId: number, product: ProductModel) {
    this.putProduct(restaurantId, product).subscribe(
      result => {
        const productInArray = this.products.find(el => el.id === product.id);
        const index = this.products.indexOf(productInArray);
        this.products[index] = result;
        this.productsChange.next(this.products.slice());
      }
    );
  }

  putProduct(restaurantId: number, product: ProductModel) {
    return this.httpClient.put<ProductModel>(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI + product.id,
      product);
  }

  postProduct(restaurantId: number, product: ProductModel) {
    return this.httpClient.post<ProductModel>(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI, product
    );
  }

  getProduct(restaurantId: number, idProduct: number) {
    return this.httpClient.get<ProductModel>(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI + idProduct
    );
  }

  getProducts(restaurantId: number) {
    return this.httpClient.get<ProductModel[]>(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI
    ).pipe(
        tap(products => {
          this.setProducts(products);
        })
      );
  }

  getProductsByCategory(restaurantId: number, category: string) {
    const params = category ? {params: new HttpParams().set('category', category)} : {};
    return this.httpClient.get<ProductModel[]>(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI,
      params
    );
  }

  deleteProduct(restaurantId: number, product: ProductModel) {
    const index = this.products.indexOf(product);
    return this.httpClient.delete(
      environment.api_url + this.restaurantURI + restaurantId + this.productURI + product.id)
        .subscribe( () => {
          this.products.splice(index, 1);
          this.productsChange.next(this.products.slice());
          return true;
        }, () => false);
  }

  getCategories(): Observable<any> {
    return this.httpClient.get<CategoryModel[]>(environment.api_url + this.categoryURI);
  }
}
