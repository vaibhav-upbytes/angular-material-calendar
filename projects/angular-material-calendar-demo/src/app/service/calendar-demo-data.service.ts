import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CalendarDemoDataService {

    constructor(private _httpClient: HttpClient) {}

  getEventsData(): Observable<Event[]> {
    const href = 'assets/data.json';


    return this._httpClient.get<Event[]>(href);
  }
}
