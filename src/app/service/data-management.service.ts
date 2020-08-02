import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private baseUrl: string = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  public getResource<T>(url: string, paramMap?: Map<string, string>) {
    const params = this.getHttpParams(paramMap);
    console.log('Sending GET request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.get<T>(
      this.baseUrl + url,
      {params}
    );
  }

  public headResource(url: string, paramMap?: Map<string, string>): Observable<any> {
    const params = this.getHttpParams(paramMap);
    console.log('Sending HEAD request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.head(
      this.baseUrl + url,
      {params}
    );
  }

  public postResource<T>(url: string, object: T): Observable<any> {
    console.log('Sending POST request to server :');
    console.log(this.baseUrl + url);
    return this.httpClient.post<T>(
      this.baseUrl + url,
      object
    );
  }

  public putResource<T>(url: string, object: T): Observable<any> {
    console.log('Sending PUT request to server :');
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

  public getHttpParams(paramMap: Map<string, string>): any {
    let params = new HttpParams();
    if (paramMap) {
      for (const [key, value] of paramMap.entries()) {
        params = params.append(key, value);
      }
    }
    return params;
  }
}

