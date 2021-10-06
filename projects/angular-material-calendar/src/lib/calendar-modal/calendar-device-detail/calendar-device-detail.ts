import { DeviceInfo } from 'ngx-device-detector'

export interface CalendarDeviceDetail {
    deviceInfo: DeviceInfo;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}