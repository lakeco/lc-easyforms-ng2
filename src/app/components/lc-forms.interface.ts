export interface LCFormData {
    elements: LCElement[];
    settings?: Settings;
    classes?: Classes;
}

export interface LCElement {
    type: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'textarea';
    key: string;
    label?: string;
    placeholder?: string;
    value?: Array<string | number>;
    order?: number;
    emitChanges?: boolean;
    options?: Array<{ value: string | number, name: string, disabled: boolean }>;
    classes?: {
        wrapper?: string;
        label?: Array<string>;
        element?: Array<string>;
        group?: Array<string>;
        error?: Array<string>;
    };
    rows?: number;
    validation?: Array<Validation>;
}

export interface Settings {
    submitButton?: boolean;
    submitButtonText?: string;
    submitButtonExtraValidation?: boolean;
    noteText?: string;
    noteLabel?: string;
    singleErrorMessage?: boolean;
    showValidation?: boolean;
    errorOnDirty?: boolean;
}

export interface Classes {
    form?: string | Array<string>;
    submit?: string | Array<string>;
    submitButton?: string | Array<string>;
    note?: string | Array<string>;
    noteLabel?: string | Array<string>;
    errors?: string | Array<string>;
}

export interface Validation {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'match';
    value?: any;
    message?: string;
}
