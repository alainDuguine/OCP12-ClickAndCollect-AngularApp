import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataManagementService} from './data-management.service';
import {map} from 'rxjs/operators';


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
        console.log('success');
        return true;
      },
      () => {
        console.log('error');
        return false;
      }
    ));
  }
}
