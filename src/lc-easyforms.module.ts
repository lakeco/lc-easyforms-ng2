import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LCFormComponent } from './lc-easyforms.component';
import { LCElementComponent } from './lc-element.component';
import { LCFormService } from './lc-easyforms.service';

@NgModule({
    declarations: [LCFormComponent, LCElementComponent],
    imports: [
        UniversalModule,
        ReactiveFormsModule,
        FormsModule],
    exports: [LCFormComponent, LCElementComponent],
    providers: [LCFormService]
})
export class LCFormsModule { }