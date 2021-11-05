import { Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";

class Interval {
	low: number = 0;
	high: number = 0;

}

class EventNode {
	max: number = 0;
	left?: EventNode;
	right?: EventNode;
	i?: CalendarEventFull;
}

@Injectable({
	providedIn: "root"
})
export class CalendarEventConflictService {
	constructor() { }

	private eventNode(i: CalendarEventFull) {
		var temp = new EventNode();
		temp.i = i;
		temp.max = i.end!;
		return temp;
	}
	private insertNode(root: EventNode, i: CalendarEventFull) {

		if (root == null)
			return this.eventNode(i);

		let l = root.i?.start!;

		if (i.start! < l)
			root.left = this.insertNode(root.left!, i);

		else
			root.right = this.insertNode(root.right!, i);

		if (root.max < i.end!)
			root.max = i.end!;
		return root;
	}

	private isConflict(i1: CalendarEventFull, i2: CalendarEventFull) {
		if (i1.start! < i2.end! && i2.start! < i1.end!)
			return true;
		return false;
	}

	private conflictSearch(root: EventNode, i: CalendarEventFull, conflictingEvents: CalendarEventFull[]): CalendarEventFull {

		if (root == null)
			return {};

		if (this.isConflict(root.i!, i))
			conflictingEvents.push(root.i!);
		if (root.left != null &&
			root.left.max >= i.start!)
			return this.conflictSearch(root.left, i, conflictingEvents);

		return this.conflictSearch(root.right!, i, conflictingEvents);
	}

	conflicting(events: CalendarEventFull[], DAYS: number) {

		let root: EventNode;
		root = this.insertNode(root!, events[0]);

		for (let i = 1; i < events.length; i++) {
			let conflictingEvents: CalendarEventFull[] = [];

			this.conflictSearch(root, events[i], conflictingEvents);

			events[i].conflics = conflictingEvents.length;
			conflictingEvents.push(events[i]);
			this.conflictedEventWidthFr(conflictingEvents, DAYS);

			root = this.insertNode(root, events[i]);
		}
	}


	conflictedEventWidthFr(conflicts: CalendarEventFull[], DAYS: number) {
		conflicts.forEach((c, index) => {
			c.widthFr = 1 / conflicts.length;
			c.leftFr = c.left! + (DAYS * index) / conflicts.length;
		});
		return conflicts
	}

}

