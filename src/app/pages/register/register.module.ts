import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      [{ path: '', component: RegisterComponent}]
    )
  ]
})
export class RegisterModule { }
