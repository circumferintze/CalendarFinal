import {Injectable} from '@angular/core';
import {Calendar} from './calendar.model';
import {StaticDataSource} from "./static.datasource";

@Injectable()
    export class CalendarRepository {
        private days : Calendar[] = [];
        private categories : string[] = [];
        
        constructor(private dataSource : StaticDataSource) 
        {
            dataSource.getDays().subscribe(data => {
                this.days = data});
        }

        getDays() :Calendar[] {
            return this.days;
        }

        getDay(date : number) : Calendar {
            return this.days.find(d => d.date == date);
        }
    }