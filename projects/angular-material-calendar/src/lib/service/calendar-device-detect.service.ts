import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CalendarDeviceDetectService extends DeviceDetectorService{
    constructor(@Inject(PLATFORM_ID) platformId: any) {
        const userAgent: string = window.navigator.userAgent;
        super(platformId);
        if (isPlatformServer(platformId)) {
          super.setDeviceInfo((userAgent as string) || '');
        }
      }
}