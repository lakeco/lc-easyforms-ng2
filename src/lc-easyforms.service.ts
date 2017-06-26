import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LCElement, Validation } from './lc-easyforms.interface';
import { LCCustomValidators } from './lc-custom-validators.class';

@Injectable()
export class LCFormService {
    create(elements: LCElement[]): any {
        let temp = {},
            toReturn = {},
            matches:any[] = [];

        elements.forEach(e => {
            let val = e.value || '',
                validators = null;

            if (e.validation) {

                if (Array.isArray(e.validation)) {
                    validators = [];
                    e.validation.forEach(i => validators.push(setValidator(i, e)));
                }

                else validators = setValidator(e.validation)
            }

            temp[e.key] = new FormControl(val, validators);
        });

        toReturn['fbGroup'] = new FormGroup(temp);

        // Add matches for watching if required
        if (matches.length) toReturn['matches'] = matches;

        return toReturn;

        function setValidator(item: Validation, original?) {
            switch (item.type) {
                case 'required': return Validators.required;
                case 'minLength': return Validators.minLength(item.value);
                case 'maxLength': return Validators.maxLength(item.value);
                case 'pattern': return Validators.pattern(item.value);
                case 'match':
                    matches.push({ toMatch: item.value, model: original.key });
                    return LCCustomValidators.match(item.value);
            }
        }
    }
}