import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const businessHourValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const startDay = daysOfWeek.indexOf(control.get('startDay').value);
  const endDay = daysOfWeek.indexOf(control.get('endDay').value);
  const startTimeHour = control.get('startTimeHour').value;
  const startTimeMinute = control.get('startTimeMinute').value;
  const endTimeHour = control.get('endTimeHour').value;
  const endTimeMinute = control.get('endTimeMinute').value;
  if (startDay === -1 || endDay === -1 || !startTimeHour || !startTimeMinute || !endTimeHour || !endTimeMinute) {
    return { validBusinessHour: true };
  } else if (+startDay > +endDay) {
    return { validDay: true };
  } else if (+startTimeHour.concat(startTimeMinute) > +endTimeHour.concat(endTimeMinute)) {
    return { validHour: true };
  }
};
