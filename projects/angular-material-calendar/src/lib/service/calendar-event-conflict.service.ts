import { Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";

// class Interval {
// 	low: number = 0;
// 	high: number = 0;
// 	constructor() {
// 		this.low = 0;
// 		this.high = 0;
// 	}
// }

class EventNode {
	// 'i' could also be a normal variable
	max: number = 0;
	left?: EventNode;
	right?: EventNode;
	i?: CalendarEventFull;
	constructor() {
		
	}
}
@Injectable({
	providedIn: "root"
})
export class CalendarEventConflictService {
	constructor() { }

	newNodeDouble(e: CalendarEventFull) {
		return e;
	}

	newNodeSingle(e: CalendarEventFull) {
		var temp = new EventNode();
		temp.i = e;
		temp.max = e.top!;
		//temp.left = temp.right = null;
		return temp;
	}

	insert(root: EventNode, i: CalendarEventFull) {
		if (root == null)
			return this.newNodeSingle(i);
		var l = root.i?.top! + root.i?.height!;
		if ((i.top! + i.height!) <= l)
			root.left = this.insert(root.left!, i);
		else
			root.right = this.insert(root.right!, i);

		// Update the max value of this
		// ancestor if needed
		if (root.max < i.top!)
			root.max = i.top!;
		return root;
	}

	// A utility function to check if given
	// two intervals overlap
	doOVerlap(i1: CalendarEventFull, i2: CalendarEventFull, leftFr: number) {
		if (i1.start!  <= i2.start! && i1.end! >= i2.start!) {
			i1.conflics!++;
			i2.conflics!++;
			i2.leftFr =  i1.leftFr! + 1;
		 }
	}

	// The main function that searches a given
	// interval i in a given Interval Tree.
	overlapSearch(root: EventNode, i: CalendarEventFull): void {

		// // Base Case, tree is empty
		if (root != null){
			
		// If given interval overlaps with root
		this.doOVerlap(root.i!, i, 1)
		
		// If left child of root is present
		// and max of left child is greater
		// than or equal to given interval,
		// then i may overlap with an interval
		// is left subtree
		if (root.left != null &&
			root.left.max >= (i.top! + i.height!) )
			 this.overlapSearch(root.left, i);

		// Else interval can only
		// overlap with right subtree
		 this.overlapSearch(root.right!, i);
		}

	}

	printConflicting(events: CalendarEventFull[]): CalendarEventFull[] {
		// var root: EventNode;
		events.forEach((e: CalendarEventFull) => {
			e.conflics = 0;
			e.leftFr = 1;
			//root = this.insert(root, e);
		});
		// for (var i = 1; i < events.length; i++) {

		// 	this.overlapSearch(root!, events[i]);
        //     let count: number = 0;
		// 		console.log(events[i], "conflict with ", events[i].conflics);
		// }

		for(let i = 0; i < events.length ; i ++) {
			for (let j = i +1 ; j < events.length; j++) {
				this.doOVerlap(events[i], events[j], j);
			}
		}
		return events;
	}

}

