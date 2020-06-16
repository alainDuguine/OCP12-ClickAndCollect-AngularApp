import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UniqueEmailValidator implements AsyncValidator {

  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.isEmailTaken(control.value).pipe(
      map(isTaken => {
          return isTaken ? { uniqueEmail: true } : null;
      }),
      catchError(() => of(null))
    );
  }

}
