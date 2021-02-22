import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PrincipalModule } from './pages/principal/principal.module';
import { ToastrService } from 'ngx-toastr';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from './services/interceptors/errors.interceptor';

import { appStore } from './store';
import { ShipsEffects } from './store/effects/ships.effects';
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
    PrincipalModule,
    StoreModule.forRoot(appStore),
    EffectsModule.forRoot([ShipsEffects]),
    StoreDevtoolsModule.instrument()
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
