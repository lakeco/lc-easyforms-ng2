import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { LCElement } from './lc-easyforms.interface';

@Component({
    selector: 'lc-element',
    template: require('./lc-element.component.html')
})

export class LCElementComponent {

    // Add class to the wrapper
    @HostBinding('class') get toSet() {
        return this.element && this.element.classes && this.element.classes.wrapper ? this.element.classes.wrapper : '';
    }

    @Input() set info(value) {
        this.element = value.element;
        this.form = value.form;
        this.settings = value.settings;
        this.classes = value.classes;

        if (this.element.type === 'checkbox') {
            this.element.value = !this.element.value ? [] : this.element.value;
            this.checkboxIsRequired = this.element.validation && this.element.validation[0].type === 'required';
        }

        if (this.classes.errors) {
            if (!this.element.classes.error) { this.element.classes.error = this.classes.errors; }
            else { this.element.classes.error = this.element.classes.error.concat(this.classes.errors); }
        }
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    element: LCElement;
    form: FormGroup;
    classes: any;

    private checkboxIsRequired: boolean = false;
    private settings: any;

    get showErrorMsg() {
        return this.settings.errorOnDirty ?
            !this.form.controls[this.element.key].valid && !this.form.controls[this.element.key].dirty :
            !this.form.controls[this.element.key].valid
    }


    errors() {
        if (this.element.validation && !this.form.controls[this.element.key].valid) {
            let temp: any = [],
                errors = this.form.controls[this.element.key].errors,
                errorKeys = Object.keys(errors);

            if (this.settings.singleErrorMessage) temp.push(this._setError(errorKeys[errorKeys.length - 1], errors));
            else errorKeys.forEach(a => temp.push(this._setError(a, errors)));

            return temp;
        }
    }

    setRadio(option) {
        this.form.controls[this.element.key].setValue(option.value);
        this.onValueChange(option.value)
    }

    setCheckbox(option) {
        let index = this.element.value.indexOf(option.value);

        if (index !== -1) this.element.value.splice(index, 1);
        else this.element.value.push(option.value);

        this.form.controls[this.element.key].setValue(this.element.value);
        this.onValueChange(this.element.value)
    }

    chackboxValueChange() {
        if (this.checkboxIsRequired) {
            if (this.element.value.length === 1) this.element.options.find(a => a.value === this.element.value[0]).disabled = true;
            else this.element.options.forEach(a => a.disabled = false)
        }
    }

    onValueChange(event) { if (this.element.emitChanges !== false) this.valueChange.emit({ [this.element.key]: event }) }
    isSelectActive(option) { return this.element.value.find(a => a === option.value) ? true : false }

    private _setError(item, errors) {
        let errorMsg: string = this.element.validation.find(a => a.type.toLowerCase() === item).message,
            tag: string = this.element.label || this.element.key;

        if (!errorMsg) {
            switch (item) {
                // Set error messages
                case 'required':
                    errorMsg = `${tag} is required.`;
                    break;

                case 'minlength':
                    errorMsg = `${tag} has to be at least ${errors[item].requiredLength} characters long.`;
                    break;

                case 'maxlength':
                    errorMsg = `${tag} can't be longer then ${errors[item].requiredLength} characters.`;
                    break;

                case 'pattern':
                    errorMsg = `${tag} must match this pattern: ${errors[item].requiredPattern}.`;
                    break;

                case 'match':
                    errorMsg = `${tag} must match the ${errors[item].mustMatchField} field.`;
                    break;
            }
        }
        return errorMsg;
    }
}