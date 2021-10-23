import { Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";


@Injectable({
	providedIn: "root"
})
export class CalendarEventConflictService {
	constructor() { }

	newNodeDouble(e: CalendarEventFull) {
		return e;
	}


	doOVerlap(i1: CalendarEventFull, i2: CalendarEventFull, conflics: CalendarEventFull[]) {
		if (i1.start! <= i2.start! && i1.end! >= i2.start!) {
			i1.conflics!++;
			i2.conflics!++;
			conflics.push(i2);
			i2.leftFr = i1.leftFr! + 1;
		}
	}

	conflicting(events: CalendarEventFull[]): CalendarEventFull[] {
		// var root: EventNode;
		events.forEach((e: CalendarEventFull) => {
			e.conflics = 0;
			e.leftFr = 1;
		});
		let conflicfs: CalendarEventFull[] = [];

		for (let i = 0; i < events.length; i++) {
			for (let j = i + 1; j < events.length; j++) {
				this.doOVerlap(events[i], events[j], conflicfs);
			}
			if (conflicfs.length > 0) {
				let n = this.eventsConflics(conflicfs);
				events[i].conflics = n > 0 ? events[i].conflics : 1;
			}
		}
		return events;
	}

	eventsConflics(conflics: CalendarEventFull[]): number {
		let n: number = 0;
		for (let i = 0; i < conflics.length; i++) {
			for (let j = i + 1; j < conflics.length; j++) {
				if (conflics[i].start! <= conflics[j].start!
					&& conflics[i].end! >= conflics[j].start!) {
					n++;
				}
			}
		}
		return n;
	}

}

