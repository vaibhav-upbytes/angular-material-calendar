# Angular Material Calendar

This calendar library is devloped on Angular13+ and AngularMaterial13+ version.
This support material design, prebuilt and custom theme and typography.
[Angular Material Calendar Demo](http://angularcalendar.upbytes.in)

## Install

### angular-cli
Run below to add this library in your project.
```
ng add  @upbytes.in/angular-material-calendar
```
This will prompt you to select color theme.<b>Please select same color theme which you have selected for material installation.</b>

### npm
Run below to add this library in your project.
```
npm install  @upbytes.in/angular-material-calendar
```

if you are using npm command to install Angular Material Calendar library then you need add peer dependencies.

```
   {
    "moment": "^2.29.1",
    "rxjs": "~7.4.0",
    "@angular/material-luxon-adapter": "^13.1.1",
    "@types/luxon": "^2.0.5",
    "@ngrx/store": "^13.0.2"
   }
```

## Add in your module.ts
```
import { AngularMaterialCalendarModule } from 'angular-material-calendar';

imports: [
    ....
    StoreModule.forRoot({}),
    MaterialModule,
    AngularMaterialCalendarModule
]
```

## Add in your component html

```
<upbytes-angular-material-calendar [dataSource]="dataSource">
</upbytes-angular-material-calendar>
```

A datasource could be an array, obserable or material Datasource. You can remove `[dataSource]` if you dont have any event to display.


## Event

an event object should contain below fields.
```
export interface Event  {
    start: number | string | Moment | DateTime | Date,
    end: number | string | Moment | DateTime | Date,
    color: string
    title?: string,
    description?: string
  }
  ```


