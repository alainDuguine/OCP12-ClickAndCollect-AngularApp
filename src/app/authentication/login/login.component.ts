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

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const loginForm = new LoginFormModel(this.loginForm.get('username').value, this.loginForm.get('password').value);
    this.authService.login(loginForm)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/restaurants/']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
