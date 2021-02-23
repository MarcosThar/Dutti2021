import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS_FRONT } from 'src/app/constants/pathsFront';
import { UserLogin } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fieldIsRequired } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  PATHS = PATHS_FRONT;
  loginForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  loginUser(): void {
    const userLogin: UserLogin = this.loginForm.value;
    this.loginForm.disable();
    this.dataLoading = true;
    this.authService.login(userLogin).subscribe(
      () => this.router.navigate([this.PATHS.principal]),
    ).add(() => {
      this.dataLoading = false;
      this.loginForm.enable();
    })
  }

  fieldIsRequired = (field: string): boolean => fieldIsRequired(this.loginForm, field)

}

