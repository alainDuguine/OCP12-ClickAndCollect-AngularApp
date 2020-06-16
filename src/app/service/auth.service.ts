import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isEmailTaken(email: string): Observable<boolean> {
    return of(true);
  }

}
