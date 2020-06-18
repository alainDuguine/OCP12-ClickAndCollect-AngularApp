import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DataManagementService} from './data-management.service';
import {RegistrationFormModel} from '../model/RegistrationFormModel';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURI = '/auth';
  registerURI = '/register';

  constructor(private dataManagementService: DataManagementService) { }

  public isEmailTaken(email: string): Observable<boolean> {
    const params = new Map();
    params.set('email', email);
    return this.dataManagementService.headResource(
      this.authURI + this.registerURI,
      params
    ).pipe(
      map(
      () => {
        return true;
      }),
      catchError(error => {
        if (error.status === 404) {
          return of(false);
        }
      })
    );
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
