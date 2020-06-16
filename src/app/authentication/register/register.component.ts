import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
  ) { }

  ngOnInit(): void {
    console.log('Init form');
    this.registerForm = new FormGroup({
      restaurantName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    });
    // }, {
    //   validator: ConfirmedValidator('password', 'confirmPassword')
    // });
  }

  onSubmit() {
    console.log(this.registerForm);
  }

  get f() { return this.registerForm.controls; }

  onClear() {
    this.ngOnInit();
  }
}
