import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LCFormComponent } from './lc-forms.component';
import { LCElementComponent } from './lc-element.component';
import { LCFormService } from './lc-forms.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [LCFormComponent, LCElementComponent],
    exports: [LCFormComponent, LCElementComponent],
    providers: [LCFormService]
})
export class LCFormsModule { }
