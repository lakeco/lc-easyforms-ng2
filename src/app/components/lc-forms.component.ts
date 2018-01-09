import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators, FormArray } from '@angular/forms';
import { LCFormData, Settings } from './lc-forms.interface';
import { LCElementComponent } from './lc-element.component';
import { LCFormService } from './lc-forms.service';

@Component({
    templateUrl: './lc-forms.component.html',
    // tslint:disable-next-line:component-selector
    selector: 'lc-form'
})
export class LCFormComponent {
    comp: any;

    private _data: LCFormData;
    private _form: FormGroup;
    private _matches: any[];

    constructor(private _controlGroup: LCFormService) { }

    // Input
    @Input() set lcFormData(value: LCFormData) {
        this._data = value;
        this._data.settings = this._setSettings(value.settings);
        this.sortElements();

        const cg = this._controlGroup.create(this._data.elements);
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
    @Output() submitted: EventEmitter<any> = new EventEmitter();
    @Output() changed: EventEmitter<any> = new EventEmitter();
    submit() { this.submitted.emit(this._form.value); }

    onElementValueChange(event) {
        if (this._matches) {
            // console.log('this._matches: ', this._matches);
            const key = Object.keys(event)[0],
                // See if we should check for matches
                mat = this._matches[0].find(a => a.toMatch === key);

            // Update the cg if we found a matcher
            if (mat) { this._form.controls[mat.model].updateValueAndValidity(); }
        }

        this.changed.emit(event);
    }

    sortElements() { this._data.elements.sort((a, b) => a.order - b.order); }

    private _setSettings(settings: Settings) {
        const defaultSettings = {
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
            for (const p in defaultSettings) {
                if (settings.hasOwnProperty(p)) { defaultSettings[p] = settings[p]; } else {
                    defaultSettings[p] = defaultSettings[p];
                }
            }
        }

        return defaultSettings;
    }
}
