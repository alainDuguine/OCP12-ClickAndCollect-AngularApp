import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  addProduct(idRestaurant: number, product: ProductModel) {
    this.postProduct(idRestaurant, product).subscribe(
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

  updateProduct(idRestaurant: number, product: ProductModel) {
    this.putProduct(idRestaurant, product).subscribe(
      result => {
        const productInArray = this.products.find(el => el.id === product.id);
        const index = this.products.indexOf(productInArray);
        this.products[index] = result;
        this.productsChange.next(this.products.slice());
      }
    );
  }

  putProduct(idRestaurant: number, product: ProductModel) {
    return this.httpClient.put<ProductModel>(
      environment.api_url + this.restaurantURI + idRestaurant + this.productURI + product.id,
      product);
  }

  postProduct(idRestaurant: number, product: ProductModel) {
    return this.httpClient.post<ProductModel>(
      environment.api_url + this.restaurantURI + idRestaurant + this.productURI, product
    );
  }

  getProduct(idRestaurant: number, idProduct: number) {
    return this.httpClient.get<ProductModel>(
      environment.api_url + this.restaurantURI + idRestaurant + this.productURI + idProduct
    );
  }

  getProducts(id: number) {
    return this.httpClient.get<ProductModel[]>(
      environment.api_url + this.restaurantURI + id + this.productURI
    ).pipe(
        tap(products => {
          this.setProducts(products);
        })
      );
  }

  deleteProduct(idRestaurant: number, product: ProductModel) {
    const index = this.products.indexOf(product);
    return this.httpClient.delete(
      environment.api_url + this.restaurantURI + idRestaurant + this.productURI + product.id)
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
