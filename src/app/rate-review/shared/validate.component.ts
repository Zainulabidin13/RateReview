import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";

@Injectable()
export class ValidatorClass{
    public StringMaxLength(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null =>
        {
          if(control.value)
             if(control.value.toString().length>max){
    
            control.patchValue(control.value.toString().slice( 0, max));
          const isWhitespace = (control.value || '') === 0;
          const isValid = !isWhitespace;
          return  null;
        }
    
      if(control.value==null)
      control.patchValue('');
    
        return null;
    
        };
      }
      public NumberMaxLength(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null =>
        {
          if(control.value)
             if(control.value.toString().length>max){
    
            control.patchValue(control.value.toString().slice( 0, max));
          const isWhitespace = (control.value || '') === 0;
          const isValid = !isWhitespace;
          return  null;
        }
    
      if(control.value==null)
    
        return null;
    
        };
      }
      public NumberNegativeCheck(control: AbstractControl) {
        if(control.value<0){
    
            control.patchValue(0);
          const isWhitespace = (control.value || '') === 0;
          const isValid = !isWhitespace;
          return isValid ? null : { 'negative': true };
        }
        return null;
      }
      public NumberMaxValue(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null =>
        {
  
          if(control.value)
             if(control.value>max){
  
            control.patchValue(control.value-max);
          const isWhitespace = (control.value || '') === 0;
          const isValid = !isWhitespace;
          return  null;
        }
        if(control.value==null)
    control.patchValue('1');

      return null;

      };
    }
}