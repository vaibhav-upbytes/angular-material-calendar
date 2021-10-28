import { Injectable, Optional } from "@angular/core";
import { CalendarConfig } from "../calendar-modal/calendar-config/calendar-config";

@Injectable({
    providedIn: 'root'
})
export class CalendarServiceConfig {
    private _format?: string;
    private _local?: string;
    private _view?: string;

    constructor(@Optional() config?: CalendarConfig) {
        if (config) { 
            this._format = config.format;
            this._local = config.local;
            this._view = config.view;
        }
    }

    get format() {
        return this._format;
    }

    get local() {
        return this._local;
    }

    get view() {
        return this._view;
    }
}