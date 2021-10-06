import { Injectable } from "@angular/core";
import { CalendarDeviceDetail } from "../calendar-modal/calendar-device-detail/calendar-device-detail";
import { CalendarDeviceDetectService } from "./calendar-device-detect.service";

@Injectable({ providedIn : 'root'})
export class CalendarDeviceDetailService {

    constructor(
        private calendarDeviceDetailService: CalendarDeviceDetectService
        ){}

    getDeviceDetail(): CalendarDeviceDetail {
        return {
            deviceInfo: this.calendarDeviceDetailService.getDeviceInfo(),
            isDesktop: this.calendarDeviceDetailService.isDesktop(),
            isMobile: this.calendarDeviceDetailService.isMobile(),
            isTablet: this.calendarDeviceDetailService.isTablet()
        }
    }
}