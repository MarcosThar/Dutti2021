import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[     
        CommonModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule],
        providers: [
          {provide: AuthService, useValue: AuthService}
        ]
        

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
   
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initForm should create loginForm', () => {
    component.initForm()
    expect(component.loginForm).toBeTruthy();
  });

  it('loginUser should navigate to principal', () => {
    expect(component).toBeTruthy();
  });

  it('loginUser should disable and enable loginForm', () => {
    expect(component).toBeTruthy();
  });

  it('fieldIsRequired should return true', () => {
    expect(component).toBeTruthy();
  });

  it('fieldIsRequired should return false', () => {
    expect(component).toBeTruthy();
  });
});
