import { CommonModule } from '@angular/common';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';


import { LoginComponent } from './login.component';
import { defer, of } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from '../principal/principal.component';
import { PATHS_FRONT } from 'src/app/constants/pathsFront';



export const asyncError = <T>(errorObject: any) =>
  defer(() => Promise.reject(errorObject));

const userMock = {
  username: 'pepe',
  password: 'Pepe012'
}
const koResponseLogin = new HttpErrorResponse({
  error: { msg: 'User is invalid' },
  status: 401,
  statusText: 'Not Found'
});

const okResponseLogin = {
  user: {
    "firstName": "Paco",
    "lastName": "Ruiz",
    "username": "paco",
    "email": "paco@paco.es"
  },
  msg: 'User is valid'
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, PrincipalComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: LoginComponent },
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initForm should create loginForm', () => {
    component.initForm()
    expect(component.loginForm).toBeTruthy();
  });
  it("loginUser should navigate to principal", () => {
    component.loginForm.setValue(userMock)
    spyOn(authService, 'login').and.returnValue(of(okResponseLogin))
    const spy = spyOn(router, 'navigate').and.callFake(() => { });
    component.loginUser();
    expect(spy).toHaveBeenCalledWith([PATHS_FRONT.principal]);
  });

  it('field password IsRequired should return false', () => {
    expect(component.fieldIsRequired('password')).toBeFalsy();
  });

  it('field username IsRequired should return false', () => {
    expect(component.fieldIsRequired('username')).toBeFalsy();
  });

  it('field password IsRequired should return true', () => {
    component.loginForm.controls.password.markAsTouched()
    expect(component.fieldIsRequired('password')).toBeTruthy();
  });

  it('field username IsRequired should return true', () => {
    component.loginForm.controls.username.markAsTouched()
    expect(component.fieldIsRequired('username')).toBeTruthy();
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

  it("loginUser should keep the same state", () => {
    fixture.detectChanges()
    expect(component.loginForm.enabled).toBeTruthy();
    component.loginForm.setValue(userMock)
    spyOn(authService, 'login').and.returnValue(asyncError(koResponseLogin))
    component.loginUser();

    // Al estar dentro del operador add la activacion del formulario se realiza de manera asincrona 
    // y sin el setTimeOut no le da tiempo a cambiar el estado del formulario antes de la comprobacion en el expect
    // lo que nos permite hacer una doble comprobacion del estado del formulario durante la ejecucion y tras ella 
    // Podemos ver si hacerlo mejor y evitar el setTimeOut pero en este creo que puede estar aportando
    expect(!component.loginForm.enabled).toBeTruthy();
    setTimeout(() =>
      expect(component.loginForm.enabled).toBeTruthy())
  });
});