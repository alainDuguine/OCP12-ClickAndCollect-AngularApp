import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {JwtInterceptor} from './authentication/jwt-interceptor';
import {AuthInterceptor} from './authentication/auth-interceptor';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {ClientsModule} from './clients/clients.module';
import {RestaurantsModule} from './restaurants/restaurants.module';
import {ModalComponent} from './shared/modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    ClientsModule,
    RestaurantsModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
