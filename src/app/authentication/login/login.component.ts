import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {LoginFormModel} from '../../model/loginFormModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: any;
  returnUrl: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const loginForm = new LoginFormModel(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.authService.login(loginForm)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          const id = this.authService.currentUserValue.id;
          this.router.navigate(['/restaurants/' + id + '/edit']);
        },
        error => {
          if (error === 'Bad credentials') {
            this.error = 'Email ou mot de passe incorrect';
          }
          this.loading = false;
        });
  }
}
