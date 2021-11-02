import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalendarView } from '../../calendar-modal/calendar-view/calendar-view';
import { CalendarHourIndicatorService } from '../../service/calendar-hour-indicator.service';


const ID = "-hour-indicator";
const TOP ="5em";

@Component({
    selector: 'upbytes-angular-material-calendar-hour-indicator',
    templateUrl: './calendar-hour-indicator.component.html',
    styleUrls: [
        './calendar-hour-indicator.component.scss'
    ]
})
export class CalendarHourIndicatorComponent implements AfterViewInit, OnDestroy {
    @ViewChild('hourindicator', {read: ElementRef }) public hourindicatorRef?: ElementRef
    
    _view$?: Observable<CalendarView>;
    _destroyed$ = new Subject<void>();
    _interval$ = new Observable<number>();
    _view?: CalendarView;
    id?: string;
    
    constructor(
        private store: Store<{ _view: CalendarView}>,
        private hourIndicatorService: CalendarHourIndicatorService
    ) {
        this._interval$ = interval(1000);
        this._view$ = store.select('_view');
        this._view$.subscribe((v) => {
            this._view = v;
            this.id = `${this._view.view}${ID}`;
        });
        this._interval$.pipe(takeUntil(this._destroyed$)).subscribe((result: any) => {
            this.hourIndicatorService.updateTop();
            this.setTop();
        });
    }
   
    ngAfterViewInit(): void {
        this.setTop();
    }

    setTop() {
        this.hourIndicatorService.styleTop(this.hourindicatorRef!, TOP);
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

}