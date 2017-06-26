import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { Validators, FormArray } from '@angular/forms';
import { LCFormData, Settings } from './lc-easyforms.interface';
import { LCElementComponent } from './lc-element.component';
import { LCFormService } from './lc-easyforms.service';

@Component({
    template: require('./lc-easyforms.component.html'),
    selector: 'lc-form'
})
export class LCFormComponent {
    // Input
    @Input() set lcFormData(value: LCFormData) {
        this._data = value;
        this._data.settings = this._setSettings(value.settings);
        this.sortElements();

        let cg = this._controlGroup.create(this._data.elements);
        this._form = cg.fbGroup;
        this._matches = cg.matches;
        this.comp = {
            data: this._data,
            form: this._form,
            settings: {
                singleErrorMessage: this._data.settings.singleErrorMessage,
                errorOnDirty: this._data.settings.errorOnDirty,
                showValidation: this._data.settings.showValidation,
                extraValidation: this._data.settings.submitButtonExtraValidation || true
            }
        };
    }

    // Outputs
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onChanges: EventEmitter<any> = new EventEmitter();

    comp: any;

    private _data: LCFormData;
    private _form: FormGroup;
    private _matches: any[];

    constructor(private _controlGroup: LCFormService) { }

    submit() { this.onSubmit.emit(this._form.value) }

    onElementValueChange(event) {
        if (this._matches) {
            //console.log('this._matches: ', this._matches);
            let key = Object.keys(event)[0],
                // See if we should check for matches
                mat = this._matches[0].find(a => a.toMatch === key);

            // Update the cg if we found a matcher
            if (mat) this._form.controls[mat.model].updateValueAndValidity();
        }

        this.onChanges.emit(event)
    }

    sortElements() { this._data.elements.sort((a, b) => a.order - b.order) }

    private _setSettings(settings: Settings) {
        let defaultSettings = {
            submitButton: true,
            submitButtonText: 'Submit',
            submitButtonExtraValidation: null,
            noteText: null,
            noteLabel: null,
            showValidation: true,
            singleErrorMessage: true,
            errorOnDirty: true
        };

        // Add received settings
        if (settings) {
            for (let p in defaultSettings) {
                defaultSettings[p] = settings.hasOwnProperty(p) ? settings[p] : defaultSettings[p];
            }
        }

        return defaultSettings;
    }
}