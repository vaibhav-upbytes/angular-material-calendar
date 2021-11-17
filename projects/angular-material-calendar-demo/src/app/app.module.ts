import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary, FaConfig} from '@fortawesome/angular-fontawesome';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialCalendarModule } from 'angular-material-calendar';
import { MaterialModule } from './material-module/material.module';
import { CalendarDemoHeader } from './header/calendar-demo-header.component';
import { CalendarDemoSideNav } from './sidenav/calendar-demo-sidenav.component';
import { CalendarDemoEvents } from './calendar-demo-events/calendar-demo-events.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CalendarDemoHeader,
    CalendarDemoSideNav,
    CalendarDemoEvents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AngularMaterialCalendarModule.forRoot({view: 'month'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary, faconfig: FaConfig) {
    library.addIcons( faStackOverflow, faGithub, faMedium);
    faconfig.defaultPrefix = 'fab';

  }
}
