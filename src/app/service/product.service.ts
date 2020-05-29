import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModel} from '../model/ProductModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: ProductModel[] = [];

  constructor(private httpClient: HttpClient) { }

  getResource(resourceUri: string): Observable<any> {
    return this.httpClient.get(environment.api_url + resourceUri);
  }

  postResource(resourceUri: string, object: any) {
    return this.httpClient.post(environment.api_url + resourceUri, object);
  }

  getProducts(id: number) {
    return this.httpClient.get(environment.api_url + '/restaurants/' + id + '/products')
      .pipe(
        map ( response => {
          const products: ProductModel[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              products.push({...response[key]});
            }
          }
          return products;
        })
      );
  }
}
