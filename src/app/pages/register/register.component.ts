import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [
        Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]]

    })
  }

  registerUser(): void {
    this.dataLoading = true;
    const userData = this.registerForm.value;
    this.registerForm.disable()
    this.authService.register(userData).subscribe(
      () => this.userRegistered(),
      () => { },
      () => {
        this.dataLoading = false;
        this.registerForm.enable()
      })

  }
  userRegistered(): void {
    this.router.navigate([''])
  }

  getField = (field: string): AbstractControl => this.registerForm.get(field);

  fieldIsTouched = (field: string): boolean => this.getField(field).touched;

  fieldIsInvalid = (field: string): boolean =>
    this.fieldIsTouched(field) && this.getField(field).invalid && this.getField(field).value;

  fieldIsRequired = (field: string): boolean =>
    this.fieldIsTouched(field) && !this.getField(field).value;

}
