import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CalendarEventFull } from "../../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventService } from "../../service/calendar-event.service";

/**
 * @author vaibhav
 * calendar event dialog component is used to display event complete data.
 */
@Component({
    selector: 'upbytes-angular-material-calendar-event-dialog',
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
        this.time = this.calendarEventService.eventFullTime(this.event.edata);
        this.positionRelativeToElement = position.positionRelativeToElement;
    }

    ngOnInit(): void {
        const matDialogConfig = this.setDialogPosition(); 
        this.dialogRef.updatePosition(matDialogConfig.position);
        this.setDialogBackground();
    }

    /**
     * use to set dialoge position according to event clicked.
     * @returns MatDialogConfig
     */
    setDialogPosition(): MatDialogConfig {
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
        return matDialogConfig;
    }

    /**
     * display dialoge backgrond accroding to event color
     */
    setDialogBackground() {
        this._element.nativeElement.parentElement!.style.background = this.event.edata.color!;
    } 

    close() {
        this.dialogRef.close();
    }
}