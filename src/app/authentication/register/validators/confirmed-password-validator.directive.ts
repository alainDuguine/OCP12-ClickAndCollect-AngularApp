import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const confirmedPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('confirmPassword');

  return !(password && confirmation && password.value === confirmation.value) ? { confirmedValidator: true } : null;
};
