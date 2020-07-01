import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DataManagementService} from './data-management.service';
import {RegistrationFormModel} from '../model/RegistrationFormModel';
import {catchError, map} from 'rxjs/operators';
import {LoginFormModel} from '../model/loginFormModel';
import {CurrentUserModel} from '../model/CurrentUserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURI = '/auth';
  registerURI = '/register';
  loginURI = '/login';
  private currentUserSubject: BehaviorSubject<CurrentUserModel>;
  currentUser: Observable<CurrentUserModel>;

  constructor(private dataManagementService: DataManagementService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUserModel>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

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

  public login(loginForm: LoginFormModel) {
    return this.dataManagementService.postResource<LoginFormModel>(
      this.authURI + this.loginURI,
      loginForm
    ).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): CurrentUserModel {
    return this.currentUserSubject.value;
  }

}
