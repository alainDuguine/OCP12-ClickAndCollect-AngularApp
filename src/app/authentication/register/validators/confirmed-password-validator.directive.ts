import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const ConfirmedPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmPassword');
  console.log(password && confirmation && password.value === confirmation.value);

  return !(password && confirmation && password.value === confirmation.value) ? { confirmedValidator: true } : null;
};
