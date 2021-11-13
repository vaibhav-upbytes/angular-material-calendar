import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CalendarDemoEvents } from '../calendar-demo-events/calendar-demo-events.component';
import { Event } from '../model/calendar-event';
@Component({
    selector: 'calendar-demo-sidenav',
    templateUrl: './calendar-demo-sidenav.component.html',
    styleUrls: ['./calendar-demo-sidenav.component.scss']
})
export class CalendarDemoSideNav {

    @Input() data?: Subject<Event>;

    constructor(private dialog: MatDialog) { }
    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = {
            top: '100',
            left: '100'
        };

        dialogConfig.data = {
            start: moment(),
            end: moment(),
            title: '',
            color: '',
            description: ''
        };

        const dialogRef = this.dialog.open(CalendarDemoEvents, dialogConfig);

        dialogRef.afterClosed().subscribe(
            d=> this.data?.next(d)
        );
    }
}
