# Angular Material Calendar

This calendar library is devloped on Angular13+ and AngularMaterial13+ version.
This support material design, prebuilt and custom theme and typography.     

## Install

### angular-cli
Run `ng add  @upbytes.in/angular-material-calendar` to add this library in your project.

### npm
Run `npm install  @upbytes.in/angular-material-calendar` to add this library in your project.

## Add in your module.ts

`import { AngularMaterialCalendarModule } from 'angular-material-calendar';`

```imports: [
    ....
    MaterialModule,
    AngularMaterialCalendarModule
]```

## Add in your component html

```<upbytes-angular-material-calendar [dataSource]="dataSource">
</upbytes-angular-material-calendar>```

A datasource could be an array, obserable or material Datasource. You can remove `[dataSource]` if you dont have any event to display.


## Event

an event object should contain below fields.
```export interface Event  {
    start: number | string | Moment | DateTime | Date,
    end: number | string | Moment | DateTime | Date,
    color: any
    title?: any,
    description?: any
  }```


