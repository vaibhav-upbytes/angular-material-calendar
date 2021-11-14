import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
    selector: 'calendar-demo-events',
    templateUrl: './calendar-demo-events.component.html',
    styleUrls: ['./calendar-demo-events.component.scss']
})
export class CalendarDemoEvents implements OnInit {

    form?: FormGroup;
    description?: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CalendarDemoEvents>
    ) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            start: new FormControl(moment().format('yyyy-MM-DDTHH:mm')),
            end: new FormControl(moment().format('yyyy-MM-DDTHH:mm')),
            title: new FormControl(''),
            description: new FormControl(''),
            color: new FormControl('#5e0d0d')
        });
    }

    save() {
        this.dialogRef.close(this.form!.value);
    }

    close() {
        this.dialogRef.close();
    }


}
