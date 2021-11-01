import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        private dialogRef: MatDialogRef<CalendarDemoEvents>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) { }
    ngOnInit(): void {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        this.form = this.fb.group({
            start: new FormControl(moment().format("yyyy-MM-DDThh:mm")),
            end: new FormControl(moment().format("yyyy-MM-DDThh:mm")),
            title: new FormControl(""),
            description: new FormControl(""),
            color: new FormControl("#5e0d0d")
        });
    }

    save() {
        console.log(this.form!.value)
        this.dialogRef.close(this.form!.value);
    }

    close() {
        this.dialogRef.close();
    }


}