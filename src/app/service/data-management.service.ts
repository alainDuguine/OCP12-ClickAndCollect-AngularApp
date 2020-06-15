import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private baseUrl: string = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  public getResource<T>(url: string) {
    console.log('Sending GET request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.get<T>(this.baseUrl + url);
  }

  public postResource<T>(url: string, object: T): Observable<any> {
    console.log('Sending GET request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.post<T>(
      this.baseUrl + url,
      object
    );
  }

  public putResource<T>(url: string, object: T): Observable<any> {
    console.log('Sending GET request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.put<T>(
      this.baseUrl + url,
      object
    );
  }

  public deleteResource<T>(url: string) {
    console.log('Sending GET request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.delete(
      this.baseUrl + url
    );
  }
}

