import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (!request.url.includes(environment.api_url + '/auth/') && err.status === 401) {
        // auto logout if 401 response returned from api
        console.log(err);
        this.authService.logout();
        location.reload();
      } else if (err.status === 403 || err.status === 404) {
        console.log(err);
        this.router.navigate(['/error']);
      }
      const error = err.error.message || err.statusText;
      console.log(error);
      return throwError(error);
    }));
  }

}
