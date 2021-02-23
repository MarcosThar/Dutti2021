import { CommonModule } from '@angular/common';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';


import { RegisterComponent } from './register.component';
import { defer, of } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from '../principal/principal.component';



export const asyncError = <T>(errorObject: any) =>
  defer(() => Promise.reject(errorObject));

const userMock = {
  "firstName": "Paco",
  "lastName": "Ruiz",
  "username": "paco",
  "password": "paco",
  "email": "paco@paco.es"
}
const koResponseRegister = new HttpErrorResponse({
  error: { msg: 'User is already registered' },
  status: 409,
  statusText: 'Conflict'
});

const okResponseRegister = {
  user: {
    "firstName": "Paco",
    "lastName": "Ruiz",
    "username": "paco",
    "email": "paco@paco.es"
  },
  msg: 'The user have been registered'
}

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, PrincipalComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: RegisterComponent },
          { path: 'principal', component: PrincipalComponent }
        ])
        ,
        ReactiveFormsModule],
      providers: [
        AuthService
      ]


    }).compileComponents();

  }));

  beforeEach(inject([AuthService, Router], (s, r) => {
    authService = s;
    router = r;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initForm should create.registerForm', () => {
    component.initForm()
    expect(component.registerForm).toBeTruthy();
  });
  it("registerUser should navigate to login", () => {
    component.registerForm.setValue(userMock)
    spyOn(authService, 'register').and.returnValue(of(okResponseRegister))
    const spy = spyOn(router, 'navigate');
    component.registerUser();
      expect(spy).toHaveBeenCalledWith(['']);
  });

  it('field password IsRequired should return false', () => {
    expect(component.fieldIsRequired('password')).toBeFalsy();
  });
  it('field password IsRequired should return true', () => {
    component.registerForm.controls.password.markAsTouched()
    expect(component.fieldIsRequired('password')).toBeTruthy();
  });

  it('field username IsRequired should return false', () => {
    expect(component.fieldIsRequired('username')).toBeFalsy();
  });
  it('field username IsRequired should return true', () => {
    component.registerForm.controls.username.markAsTouched()
    expect(component.fieldIsRequired('username')).toBeTruthy();
  });

  
  it('field firstName IsRequired should return false', () => {
    expect(component.fieldIsRequired('firstName')).toBeFalsy();
  });
  it('field firstName IsRequired should return true', () => {
    component.registerForm.controls.firstName.markAsTouched()
    expect(component.fieldIsRequired('firstName')).toBeTruthy();
  });
  
  it('field lastName IsRequired should return false', () => {
    expect(component.fieldIsRequired('lastName')).toBeFalsy();
  });
  it('field lastName IsRequired should return true', () => {
    component.registerForm.controls.lastName.markAsTouched()
    expect(component.fieldIsRequired('lastName')).toBeTruthy();
  });
  
  it('field email IsRequired should return false', () => {
    expect(component.fieldIsRequired('email')).toBeFalsy();
  });
  it('field email IsRequired should return true', () => {
    component.registerForm.controls.email.markAsTouched()
    expect(component.fieldIsRequired('email')).toBeTruthy();
  });
  
  // TEST fieldIsInvalid
  
  it('field password IsInvalid should return false when untouched', () => {
    expect(component.fieldIsInvalid('password')).toBeFalsy();
  });
  it('field password IsInvalid should return false when value is valid', () => {
    component.registerForm.controls.password.markAsTouched()
    component.registerForm.controls.password.setValue('Marcos01')
    expect(component.fieldIsInvalid('password')).toBeFalsy();
  });
  it('field password IsInvalid should return true', () => {
    component.registerForm.controls.password.markAsTouched()
    component.registerForm.controls.password.setValue('a')
    expect(component.fieldIsInvalid('password')).toBeTruthy();
  });

  it('field username IsInvalid should return false when untouched', () => {
    expect(component.fieldIsInvalid('username')).toBeFalsy();
  });
  it('field username IsInvalid should return true', () => {
    component.registerForm.controls.username.markAsTouched()
    component.registerForm.controls.username.setValue('a')
    expect(component.fieldIsInvalid('username')).toBeTruthy();
  });

  
  it('field firstName IsInvalid should return false when untouched', () => {
    expect(component.fieldIsInvalid('firstName')).toBeFalsy();
  });
  it('field firstName IsInvalid should return true', () => {
    component.registerForm.controls.firstName.markAsTouched()
    component.registerForm.controls.firstName.setValue('a')
    expect(component.fieldIsInvalid('firstName')).toBeTruthy();
  });
  
  it('field lastName IsInvalid should return false when untouched', () => {
    expect(component.fieldIsInvalid('lastName')).toBeFalsy();
  });
  it('field lastName IsInvalid should return true', () => {
    component.registerForm.controls.lastName.markAsTouched()
    component.registerForm.controls.lastName.setValue('a')
    expect(component.fieldIsInvalid('lastName')).toBeTruthy();
  });
  
  it('field email IsInvalid should return false when untouched', () => {
    expect(component.fieldIsInvalid('email')).toBeFalsy();
  });
  it('field email IsInvalid should return false when value is valid', () => {
    component.registerForm.controls.email.markAsTouched()
    component.registerForm.controls.email.setValue('massimo@dutti.com')
    expect(component.fieldIsInvalid('email')).toBeFalsy();
  });
  it('field email IsInvalid should return true', () => {
    component.registerForm.controls.email.markAsTouched()
    component.registerForm.controls.email.setValue('a')
    expect(component.fieldIsInvalid('email')).toBeTruthy();
  });
  
  it('should not render img tag', () => { 
    component.dataLoading = false;
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeFalsy();
  });

  it('should render img tag', () => { 
    component.dataLoading = true;
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeTruthy();
    component.dataLoading = false;
  });

  it("registerUser should keep the same state", () => {
    fixture.detectChanges()
    expect(component.registerForm.enabled).toBeTruthy();
    component.registerForm.setValue(userMock)
    spyOn(authService, 'login').and.returnValue(asyncError(koResponseRegister))
    component.registerUser();

    // Al estar dentro del operador add la activacion del formulario se realiza de manera asincrona 
    // y sin el setTimeOut no le da tiempo a cambiar el estado del formulario antes de la comprobacion en el expect
    // lo que nos permite hacer una doble comprobacion del estado del formulario durante la ejecucion y tras ella 
    // Podemos ver si hacerlo mejor y evitar el setTimeOut pero en este creo que puede estar aportando
    expect(!component.registerForm.enabled).toBeTruthy();
    setTimeout(() =>
      expect(component.registerForm.enabled).toBeTruthy())
  });
});