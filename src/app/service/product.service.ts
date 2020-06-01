import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {ProductModel} from '../model/ProductModel';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsChange = new Subject<ProductModel[]>();
  private products: ProductModel[] = [];

  constructor(private httpClient: HttpClient) { }

  setProducts(products: ProductModel[]) {
    this.products = products;
    this.productsChange.next(this.products.slice());
  }

  addProduct(resourceUri: string, product: ProductModel) {
    this.postProduct(resourceUri, product).subscribe(
      result => {
        this.products.push(result);
        this.productsChange.next(this.products.slice());
      });
  }

  getResource(resourceUri: string): Observable<any> {
    return this.httpClient.get(environment.api_url + resourceUri);
  }

  postResource(resourceUri: string, object: any) {
    return this.httpClient.post(environment.api_url + resourceUri, object);
  }

  postProduct(resourceUri: string, product: ProductModel) {
    return this.httpClient.post<ProductModel>(environment.api_url + resourceUri, product);
  }

  getProducts(id: number) {
    console.log('Fetching products');
    return this.httpClient.get(environment.api_url + '/restaurants/' + id + '/products')
      .pipe(
        map ( response => {
          const products: ProductModel[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              products.push({...response[key]});
            }
          }
          console.log(products.length);
          return products;
        }),
        tap(products => {
          console.log('Populating product list');
          this.setProducts(products);
        })
      );
  }
}
