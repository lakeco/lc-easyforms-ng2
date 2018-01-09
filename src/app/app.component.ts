import { Component } from '@angular/core';
import { LCCustomValidators } from './components/lc-custom-validators.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LC TEST';

  public data = {
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
                    {type: 'required'}
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
        console.log(event);
    }

    onChange(event) {
        console.log(event);
    }
}


