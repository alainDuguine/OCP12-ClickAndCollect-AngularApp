import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {ProductModel} from '../model/ProductModel';
import {tap} from 'rxjs/operators';

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
    return this.httpClient.get<ProductModel[]>(environment.api_url + '/restaurants/' + id + '/products')
      .pipe(
        tap(products => {
          this.setProducts(products);
        })
      );
  }
}
