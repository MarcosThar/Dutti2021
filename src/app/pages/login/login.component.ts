import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fieldIsRequired } from 'src/app/shared/utils';

// JSON
import usersList from 'src/assets/json/users.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  users: any = usersList;
  unregistered: boolean = false;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required]],
      password: [ '', [Validators.required]]
    })
  }
  loginUser() {
    const userLogin = this.loginForm.value;
    this.loginForm.disable();
    this.dataLoading = true;
    this.authService.login(userLogin).subscribe(
      ()=>this.router.navigate(['principal']),
      ()=>{},
      ()=>{
        this.loginForm.enable();
        this.dataLoading = true;
      }
    )
  }

  fieldIsRequired=(field)=>fieldIsRequired(this.loginForm, field)

}

