import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[minValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinValueValidatorDirective,
      multi: true
    }
  ]
})
export class MinValueValidatorDirective implements Validator {
  @Input() minValue: number = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value)
    return control.value >= this.minValue ? null : {min: true};
  }
}