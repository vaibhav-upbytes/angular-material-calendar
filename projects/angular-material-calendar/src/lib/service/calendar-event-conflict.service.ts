import { Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";

/**
 * @author vaibhav
 * This service is used to identify conflicting events and change left and width fraction 
 * according to events conflicts.
 */

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

	/**
	 * takes CalendarEventFull as a  input and return EventNode object
	 * @param i CalendarEventFull
	 * @returns EventNode
	 */
	private eventNode(i: CalendarEventFull) {
		var temp = new EventNode();
		temp.i = i;
		temp.max = i.end!;
		return temp;
	}

	/**
	 * insert event node into tree
	 * @param root EventNode
	 * @param i CalendarEventFull
	 * @returns EventNode
	 */
	private insertEventNode(root: EventNode, i: CalendarEventFull) {

		if (root == null)
			return this.eventNode(i);

		let l = root.i?.start!;

		if (i.start! < l)
			root.left = this.insertEventNode(root.left!, i);

		else
			root.right = this.insertEventNode(root.right!, i);

		if (root.max < i.end!)
			root.max = i.end!;
		return root;
	}

	/**
	 * check if two events are conflicting
	 * @param i1 CalendarEventFull
	 * @param i2 CalendarEventFull
	 * @returns boolean
	 */
	private isConflict(i1: CalendarEventFull, i2: CalendarEventFull) {
		if (i1.start! < i2.end! && i2.start! < i1.end!)
			return true;
		return false;
	}

	/**
	 * search conflicting events in tree. add new events into tree.
	 * @param root EventNode
	 * @param i CalendarEventFull
	 * @param conflictingEvents 
	 * @returns CalendarEventFull
	 */
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

	/**
	 * call from other service with input data. 
	 * @param events CalendarEventFull[]
	 * @param DAYS number
	 */
	conflicting(events: CalendarEventFull[], DAYS: number) {

		let root: EventNode;
		root = this.insertEventNode(root!, events[0]);

		for (let i = 1; i < events.length; i++) {
			let conflictingEvents: CalendarEventFull[] = [];

			this.conflictSearch(root, events[i], conflictingEvents);

			events[i].conflics = conflictingEvents.length;
			conflictingEvents.push(events[i]);
			this.conflictedEventFr(conflictingEvents, DAYS);

			root = this.insertEventNode(root, events[i]);
		}
	}

	/**
	 * update conflicting events left and width franction 
	 * @param conflicts CalendarEventFull[]
	 * @param DAYS number
	 * @returns CalendarEventFull[]
	 */
	conflictedEventFr(conflicts: CalendarEventFull[], DAYS: number) {
		conflicts.forEach((c, index) => {
			c.widthFr = 1 / conflicts.length;
			c.leftFr = c.left! + (DAYS * index) / conflicts.length;
		});
		return conflicts
	}

}

