import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataManagementService} from './data-management.service';
import {RegistrationFormModel} from '../model/RegistrationFormModel';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURI = '/auth';
  registerURI = '/register';

  private baseUrl: string = environment.api_url;

  constructor(private dataManagementService: DataManagementService,
              private httpClient: HttpClient) { }

  public isEmailTaken(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<boolean>(
      this.baseUrl + this.authURI + this.registerURI,
      {params}
    );
    // const params = new Map();
    // params.set('email', email);
    // return this.dataManagementService.headResource(
    //   this.authURI + this.registerURI,
    //   params
    // ).pipe(
    //   map(
    //   () => {
    //     console.log('success');
    //     return true;
    //   },
    //   () => {
    //     console.log('error');
    //     return false;
    //   }
    // ));
  }

  public registerRestaurant(registrationForm: RegistrationFormModel) {
    this.dataManagementService.postResource<RegistrationFormModel>(
      this.authURI + this.registerURI,
      registrationForm
    ).subscribe(
      result => {
        alert('success');
        console.log(result);
      }, error => {
        alert('error');
        console.log(error);
      }
    );
  }
}
