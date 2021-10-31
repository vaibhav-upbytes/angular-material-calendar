import { Component, Renderer2 } from '@angular/core';
import { THEMES } from '../data/calendar-theme-data';
import { CalendarTheme } from '../model/calendar-theme';

@Component({
    selector: 'calendar-demo-header',
    templateUrl: './calendar-demo-header.component.html',
    styleUrls: ['./calendar-demo-header.component.scss']
})
export class CalendarDemoHeader {
    themes: CalendarTheme[] = THEMES;

    constructor(private _renderer: Renderer2) {}

    changeTheme(option: CalendarTheme) {
        this.clearTheme();
        option.isChecked = !option.isChecked;
        this._renderer.addClass(document.body, option.class!);
    }

    clearTheme() {
        this.themes.map(o => o.isChecked = false);
        this.themes.forEach(o => this._renderer.removeClass(document.body, o.class!));
    }

}