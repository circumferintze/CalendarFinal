import {NgModule} from "@angular/core";
import {CalendarRepository} from "./calendar.repository";
import {StaticDataSource} from "./static.datasource";

@NgModule({
    providers : [CalendarRepository, StaticDataSource]
})

export class ModelModule {}