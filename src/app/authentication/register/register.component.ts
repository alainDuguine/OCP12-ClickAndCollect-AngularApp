import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from './validators/ConfirmedValidator';
import {UniqueEmailValidator} from './validators/UniqueEmailValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      email: ['', Validators.email, UniqueEmailValidator],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {

  }

  get f() { return this.registerForm.controls; }
}
