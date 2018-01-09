
# lc-forms <sub><i>by @LakeCodes</i></sub>
Is a library for simplified object-based creation and validation of forms in Angular/Angular Universal. The library is inspired by [angular.io dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) and [Filip Lauc's](https://github.com/flauc) [angular2-easy-forms](https://www.npmjs.com/package/angular2-easy-forms).

## Documentation 
1. [Setup](#setup)
1. [Elements](#elements)
1. [Validation](#validation)
1. [Events](#events)
1. [Settings](#settings)

## Setup
You can install the library from npm with the following command: 
```
npm install --save lc-forms
```

Import the `LCFormsModule` into `app.module` or parent module. 

```typescript
@NgModule({
    imports: [
        BrowserModule,
        LCFormsModule
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

## Usage
Define a list of elements as well as a settings and classes object if required and pass it to the component.

```typescript
@Component({
    selector: 'app',
    template: `
        <lc-form [lcFormData]="data" (onSubmit)="onSubmit($event)" (onChanges)="onChanges($event)"></lc-form>
    `
})
export class AppComponent {
    constructor() {}

    public data = { // form object and configuration
        settings: {
            submitButtonText: 'Send',
        },
        classes: {
            form: 'some-class',
            submit: ['class-one', 'class-two']
        },
        elements: [
            {
                type: 'text',
                key: 'firstName',
                value: 'John Doe',
                label: 'First Name',
                validation: [
                    {type: 'required'},
                    {type: 'minLength', value: 5, message: 'Please enter a name longer then 5 characters'},
                    {type: 'pattern', value: '^[a-zA-Z ]+$', message: 'Only letters and spaces are allowed'}
                ]
            },
            {
                type: 'password',
                key: 'password',
                label: 'Password',
                validation: [
                    {type: 'required'},
                    {type: 'custom', value: startsWithNumber, message: 'Please dont start with a number'}
                ]
            },
            {
                type: 'dropdown',
                key: 'address',
                label: 'Address',
                value: 'osijek',
                order: 2,
                options: [
                    {value: 'osijek', name: 'Osijek'},
                    {value: 'zagreb', name: 'Zagreb'}
                ]
            },
            {
                type: 'radio',
                key: 'gender',
                label: 'Gender',
                value: 'male',
                classes: {
                    'wrapper': 'some-class-for-the-wrapper',
                    'label': 'label-class',
                    'element': ['q-class-one', 'q-class-two'],
                    'error': ['error-one', 'error-two']
                },
                options: [
                    {value: 'male', name: 'Male'},
                    {value: 'female', name: 'Female'}
                ]
            },
            {
                type: 'checkbox',
                key: 'things',
                label: 'Things You Like',
                values: ['pokemon', 'starWars'],
                options: [
                    {value: 'starWars', name: 'Star Wars'},
                    {value: 'batlefield', name: 'Batlefield'},
                    {value: 'pokemon', name: 'Pokemon'}
                ],
                validation: [
                    {type: 'required'}
                ]
            }
        ]
    };

    onSubmit(event) {
        console.log(event)
    }

    onChanges(event) {
        console.log(event)
    }
}
```

## Elements
Each element can have the following properties: 

property | type | required | description 
------------ | ------------- | ------------- | ------------- 
type | text, password, number, dropdown (select), radio or checkbox | true | Defines the type of the element
key | string | true | Defines the key of the control, this is the key of the value that gets emitted [onSubmit](#events) and [onChange](#events) 
label | string | false | The label of the form input
value | string or array (if element `type: 'checkbox'` then its an array) | false | An initial value for the element
order | int | false | Define a specific order for the elements (if one element has an order property to achieve the required effect)
validation | object array | false | Read more about validation [here](#validation)

Each element can also have a classes object with the following properties: 

property | type | required | description 
------------ | ------------- | ------------- | ------------- 
wrapper | string or string[] | false | Class or list of classes to apply to the element wrapper.
label | string or string[] | false | Class or list of classes to apply to the label. 
element | string or string[] | false | Class or list of classes to apply to the element (input, select or div in case of checkbox or radio types).
error | string or string[] | false | Class or list of classes to apply to the error message.

If you define the type of element to be `radio`, `checkbox` or `dropdown` then you need to define an additional property:

property | type | required | description 
------------ | ------------- | ------------- | ------------- 
options | object array `{value: string, name: string}` | true | Define an array of options for the element

### Example 

```js
{
    type: 'radio',
    key: 'gender',
    label: 'Gender',
    value: 'male',
    classes: {
        'wrapper': 'some-class-for-the-wrapper',
        'label': 'label-class',
        'element': ['q-class-one', 'q-class-two'],
        'error': ['error-one', 'error-two']
    }
    options: [
        {value: 'male', name: 'Male'},
        {value: 'female', name: 'Female'}
    ]
}
```

## Validation
You can optionally set a validation property on any element. The submit button of the form will be disabled if any element is invalid.

The validation property is an object array with the following format: 
```js
{
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'match',
    value: string | int | function 
    message: string
}
```

The message property is the error message and its optional. Don't add the message property if you don't want to display an error message.

Here are the type properties and there associated values 

type | value | description
------------ | ------------- | ------------- 
'required' | none | Set the element to be required 
'minLength' | int | Set the required minimum length of the elements value
'maxLength' | int | Set the required maximum length of the elements value
'patter' | string (regex patter) | Set the patter that the elements value needs to satisfy
'custom' | function | You can pass any custom function for validation this way
'match' | string (key of the element to match against) | This elements value needs to match the assigned elements value


## Events
There are two events you can bind to: 
* onSubmit
* onChange

This is how you bind to them: 
```html
<lc-form [lcFormData]="data" (onSubmit)="fooFunction($event)" (onChanges)="barFunction($event)"></lc-form>
```

### onSubmit
The onSubmit event emits when the submit button is pressed. The emitted object contains all of the forms elements with their corresponding values `obj[key] = value`. 
If the elements type is 'checkbox' the emitted value is an array of all the checked

### OnChange
The onChange event emits when ever a value changes. The following is what gets emitted: `{[key]: value}`.
You can disable a element from triggering the onChange event by setting the `emitChanges` property to `false`.

## Settings
Along with the list of elements you can add a settings object to the passed data. 
Here are the possible options: 

property | type | default | description
------------ | ------------- | ------------ | ------------
submitButton | boolean | true | Define whether to display the submit button or not
submitButtonText | string | Send | The text of the send button
showValidation | boolean | true | Define whether validation errors should be shown or not
singleErrorMessage | boolean | true | Defines whether all of the validation errors should be shown or just the last one
errorOnDirty | boolean | true | Define if validation errors should appear only when the input is dirty or right away


You can also provide a classes object to add classes to the form wrapper and the submit wrapper: 
```js 
classes: {
    // If you want to add a single class pass a string
    // If you want to add multiple classes pass an array os class names
    form: string | string[]
    submit: string | string[]
}
```
