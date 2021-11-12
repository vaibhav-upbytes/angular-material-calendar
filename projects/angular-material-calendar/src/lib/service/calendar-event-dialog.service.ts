import { ElementRef, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { CalendarEventDialog } from '../calendar-events-module/calendar-event-dialog-view/calendar-event-dialog.component'
import { CalendarEventFull } from '../calendar-modal/calendar-event/calendar-event-full'

/**
 * @author vaibhav
 * use to open and close calendar event dialog.
 */
@Injectable({
    providedIn: 'root'
})
export class CalendarEventDialogeService {

    constructor(public dialog: MatDialog) { }

    public openDialog({ edata, positionRelativeToElement,
        hasBackdrop = false, height = '25em', width = '30em', backdropClass,
        panelClass }:
        {
            edata?: CalendarEventFull, positionRelativeToElement?: ElementRef, hasBackdrop?: boolean,
            height?: string, width?: string, backdropClass?: string, panelClass?: string
        }): MatDialogRef<CalendarEventDialog> {

        const dialogRef: MatDialogRef<CalendarEventDialog> =
            this.dialog.open(CalendarEventDialog, {
                hasBackdrop: hasBackdrop,
                height: height,
                width: width,
                panelClass: panelClass,
                backdropClass: backdropClass,
                data: { 
                    positionRelativeToElement: positionRelativeToElement,
                    edata: edata
                }
            })
        return dialogRef
    }
}
