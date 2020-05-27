import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getResource(resourceUri: string): Observable<any> {
    return this.httpClient.get(environment.api_url + resourceUri);
  }

  postResource(resourceUri: string, object: any) {
    return this.httpClient.post(environment.api_url + resourceUri, object);
  }
}
