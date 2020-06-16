import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isEmailTaken(email: string): Observable<boolean> {
    console.log(email);
    return of(true);
  }
}
