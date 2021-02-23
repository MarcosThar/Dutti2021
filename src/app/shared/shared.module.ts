import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class SharedModule { }

// TODO Implementar interceptor solo en los modulos de login y registro o eliminar ete modulo
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class InterceptorModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
         { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }
      ]
    };
  }
 }
