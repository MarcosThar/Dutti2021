import { AbstractControl, FormGroup } from "@angular/forms";


const getField = (form: FormGroup, field: string): AbstractControl => form.get(field);

const fieldIsTouched = (form, field: string): boolean => getField(form, field).touched;

const fieldIsInvalid = (form, field: string): boolean =>
    fieldIsTouched(form, field) && getField(form, field).invalid && getField(form, field).value;

const fieldIsRequired = (form, field: string): boolean =>
    fieldIsTouched(form, field) && !getField(form, field).value;

export {
    getField,
    fieldIsTouched,
    fieldIsInvalid,
    fieldIsRequired
}