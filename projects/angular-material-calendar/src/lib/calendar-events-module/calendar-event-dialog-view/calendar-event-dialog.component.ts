import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CalendarEventFull } from "../../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventService } from "../../service/calendar-event.service";

@Component({
    selector: 'angular-material-calendar-event-dialog',
    templateUrl: 'calendar-event-dialog.component.html',
    styleUrls: ['calendar-event-dialog.component.scss']
})
export class CalendarEventDialog implements OnInit {
    positionRelativeToElement?: ElementRef;
    time?: string;
    constructor(
        private _element: ElementRef<HTMLElement>,
        public dialogRef: MatDialogRef<CalendarEventDialog>,
        @Inject(MAT_DIALOG_DATA) public event: { edata: CalendarEventFull },
        @Inject(MAT_DIALOG_DATA) public position: { positionRelativeToElement: ElementRef },
        private calendarEventService: CalendarEventService) {
        this.time = this.calendarEventService.eventsubtitle(this.event.edata);
        this.positionRelativeToElement = position.positionRelativeToElement;
    }

    ngOnInit(): void {
        const matDialogConfig = new MatDialogConfig()
        const rect: DOMRect = this.positionRelativeToElement!.nativeElement.getBoundingClientRect();
        matDialogConfig.position = {
            top: `${10}em`
        }
        if (this.event.edata.left! > 4) {
            matDialogConfig.position!.right = `${rect.left}px`;
        } else {
            matDialogConfig.position!.left = `${rect.left + rect.width}px`;
        }
        matDialogConfig.position = {
            top: `${10}em`
        }
        this.dialogRef.updatePosition(matDialogConfig.position);
        this._element.nativeElement.parentElement!.style.background = this.event.edata.color!;
    }
}