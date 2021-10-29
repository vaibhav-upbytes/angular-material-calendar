import { AfterContentChecked, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, isObservable, Observable, of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CalendarView } from './calendar-modal/calendar-view/calendar-view';
import { CalendarEventInput } from './calendar-modal/calendar-event/calendar-event-input';
import { CalendarViewPortService } from './service/calendar-view-port.service';
import { CalendarServiceConfig } from './service/calendar-config.service';
import { day, month, week } from './actions/calendar-view.action';
import {
  CollectionViewer,
  DataSource,
  isDataSource
} from '@angular/cdk/collections';

export type CalendarEventDataSourceInput<T extends CalendarEventInput> = readonly T[] | DataSource<T> | Observable<readonly T[]>;

@Component({
  selector: 'lib-angular-material-calendar',
  templateUrl: './angular-material-calendar.component.html',
  styleUrls: [
    './angular-material-calendar.component.scss'
  ]
})
export class AngularMaterialCalendarComponent<T extends CalendarEventInput>
  implements OnInit, AfterContentChecked, OnDestroy, CollectionViewer {
  private readonly _destroyed$ = new Subject<void>();
  private _dataSource?: CalendarEventDataSourceInput<T>;
  protected _data?: readonly T[];
  private _renderEventSubscription$?: Subscription;
  _view$?: Observable<CalendarView>;
  _view?: CalendarView;
  _events?: CalendarEventInput[];

  constructor(
    private store: Store<{ _view: CalendarView }>,
    private calendarViewPortService: CalendarViewPortService,
    private calendarConfigService: CalendarServiceConfig
  ) {
    this.initialView(this.calendarConfigService.view!);
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
  }

  ngAfterContentChecked(): void {
    if (this.dataSource && !this._renderEventSubscription$) {
      this._observeRenderChanges();
    }
  }

  readonly viewChange = new BehaviorSubject<{ start: number; end: number }>({
    start: 0,
    end: Number.MAX_VALUE,
  });

  ngOnInit(): void {
    this.calendarViewPortService.viewportResize();
  }

  @Input()
  get dataSource(): CalendarEventDataSourceInput<T> {
    return this._dataSource!;
  }
  set dataSource(dataSource: CalendarEventDataSourceInput<T>) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }

  private _switchDataSource(dataSource: CalendarEventDataSourceInput<T>) {
    this._data = [];

    if (isDataSource(this.dataSource)) {
      this.dataSource.disconnect(this);
    }

    if (this._renderEventSubscription$) {
      this._renderEventSubscription$.unsubscribe();
      this._renderEventSubscription$ = undefined;
    }

    this._dataSource = dataSource;
  }

  private _observeRenderChanges() {
    if (!this.dataSource) {
      return;
    }

    let dataStream$: Observable<readonly T[]> | undefined;

    if (isDataSource(this.dataSource)) {
      dataStream$ = this.dataSource.connect(this);
    } else if (isObservable(this.dataSource)) {
      dataStream$ = this.dataSource;
    } else if (Array.isArray(this.dataSource)) {
      dataStream$ = of(this.dataSource);
    }

    this._renderEventSubscription$ = dataStream$!
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => {
        this._events = data.map((d) => this.createCalendarEventInput(d)) || [];
      });
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();

    if (isDataSource(this.dataSource)) {
      this.dataSource.disconnect(this);
    }
  }

  createCalendarEventInput(data: T) {
    return {
      start: data.start,
      end: data.end,
      title: data.title,
      color: data.color,
      description: data.description
    }
  }

  initialView(view: string) {
    switch (view) {
      case 'month':
        this.store.dispatch(month());
        break;
      case 'week':
        this.store.dispatch(week());
        break;
      case 'day':
        this.store.dispatch(day());
        break;
      default:
        this.store.dispatch(month());
        break;
    }
  }

}
