import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialCalendarModule } from 'angular-material-calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialCalendarModule.forRoot({view: 'month'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
