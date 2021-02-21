import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalModule } from './pages/principal/principal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from './services/interceptors/errors.interceptor';
import { ToastrService } from 'ngx-toastr';

// pages
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    PrincipalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: ToastrService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
