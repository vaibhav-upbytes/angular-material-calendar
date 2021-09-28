import * as moment from "moment";
import { from, Observable } from "rxjs";
import { Date } from "../modal/date";
import { DateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DateService {
   public date?: Observable<Date>;
   constructor(private _dateAdapter: DateAdapter<any>){
      console.log(_dateAdapter.getDate(moment()));
   }
}