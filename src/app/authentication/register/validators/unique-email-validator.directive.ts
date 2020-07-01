import {AuthService} from '../../../service/auth.service';
import {FormControl} from '@angular/forms';
import {timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export const uniqueEmailValidator = (authService: AuthService, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => authService.isEmailTaken(input.value)),
      map(isTaken => {
        console.log(isTaken);
        return isTaken ? { uniqueEmail: true } : null;
      })
    );
  };
};
