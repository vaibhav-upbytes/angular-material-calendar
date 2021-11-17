import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { THEMES } from '../data/calendar-theme-data';
import { CalendarTheme } from '../model/calendar-theme';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'calendar-demo-header',
    templateUrl: './calendar-demo-header.component.html',
    styleUrls: ['./calendar-demo-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarDemoHeader {
    themes: CalendarTheme[] = THEMES;

    constructor(
        private _renderer: Renderer2,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            `upbytes-calendar-icon`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/upbytes-calendar-icon.svg')
          );
    }

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
