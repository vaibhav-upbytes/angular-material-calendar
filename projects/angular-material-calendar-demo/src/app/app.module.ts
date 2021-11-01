import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary, FaConfig} from '@fortawesome/angular-fontawesome';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialCalendarModule } from 'angular-material-calendar';
import { MaterialModule } from './material-module/material.module';
import { CalendarDemoHeader } from './header/calendar-demo-header.component';
import { CalendarDemoSideNav } from './sidenav/calendar-demo-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarDemoHeader,
    CalendarDemoSideNav
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    AngularMaterialCalendarModule.forRoot({view: 'month'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary, faconfig: FaConfig) {
    library.addIcons( faStackOverflow, faGithub, faMedium);
    faconfig.defaultPrefix = 'fab'

  }
}
