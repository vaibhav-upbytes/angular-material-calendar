import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialCalendarComponent } from 'angular-material-calendar';
import { BehaviorSubject, combineLatestWith, debounce, debounceTime, map, Observable, of, ReplaySubject, Subject } from 'rxjs';
// import { AngularMaterialCalendarComponent } from 'angular-material-calendar';
import { Event } from './model/calendar-event';
import { CalendarDemoDataService } from './service/calendar-demo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(AngularMaterialCalendarComponent) calendar?: AngularMaterialCalendarComponent<Event>;
  data = new BehaviorSubject<Event>({});
  title = 'angular-material-calendar-demo';
  events?: Subject<Event[]> = new Subject<Event[]>();
  display: Event[] = [];

  //events?: Event[] = [];

  constructor(private calendarDemoDataService: CalendarDemoDataService) {
  this.calendarDemoDataService.getEventsData().pipe(
      map((d: any) => {
        this.display = d.data;
        return this.display;
      })
    ).subscribe(s => this.events?.next(this.display));

    // this.data.subscribe(d => {

    //   if (d!) {
    //     this.events!.push(d);
    //     // this.calendar!.dataSource = this.events;
    //     }

    // });
  }

  ngOnInit(): void {
    const updated = this.data!.pipe(debounceTime(0));

    updated.subscribe(s => {
      this.display = s! && s.start! ?   [...this.display , s] : this.display;
      this.events?.next(this.display)
    })
  }

}
