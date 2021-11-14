import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @author vaibhav
 * implementaion of angular material Breakpoint.
 *
 */
const displayNameMap = new Map([
  [Breakpoints.XSmall, 'XSmall'],
  [Breakpoints.Small, 'Small'],
  [Breakpoints.Medium, 'Medium'],
  [Breakpoints.Large, 'Large'],
  [Breakpoints.XLarge, 'XLarge'],
]);

@Injectable({
  providedIn: 'root'
})
export class CalendarViewPortService implements OnDestroy {

  destroyed = new Subject<void>();
  viewport = new Subject<string>();
  currentScreenSize?: string;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {

  }

  viewportResize(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe((result: any) => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = displayNameMap.get(query) ?? 'Unknown';
          this.viewport.next(this.currentScreenSize);
        }
      }
    });
  }


  ngOnDestroy() {
    this.viewport.next(this.currentScreenSize!);
    this.destroyed.next();
    this.viewport.complete();
    this.destroyed.complete();
  }
}
