import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
      first_name: [ '', [Validators.required, Validators.minLength(3)]],
      last_name: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6)]],

    })
  }

  registerUser() {
    if (this.registerForm.invalid) { return }
    

    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe(res=>{
    this.router.navigate(['/login'])

    },error=>{})

  }

}
