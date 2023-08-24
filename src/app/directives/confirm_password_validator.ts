import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const pass = control.get('password');
  const conf = control.get('confirm');

  const diff = pass?.value === conf?.value && pass && conf;

  return (!diff) ? { notSame: true } : null;

}

