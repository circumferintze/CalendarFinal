import {Injectable} from "@angular/core";
import {Calendar} from "./calendar.model";
import {Observable, from} from "rxjs";

@Injectable()
export class StaticDataSource {
    private days : Calendar[] = [
        new Calendar(1, ""),
        new Calendar(2, ""),
        new Calendar(3, ""),
        new Calendar(4, ""),
        new Calendar(5, ""),
        new Calendar(6, ""),
        new Calendar(7, ""),
        new Calendar(8, ""),
        new Calendar(9, ""),
        new Calendar(10, ""),
        new Calendar(11, ""), 
        new Calendar(12, ""), 
        new Calendar(13, ""), 
        new Calendar(14, ""), 
        new Calendar(15, ""),
        new Calendar(16, ""),
        new Calendar(17, ""),
        new Calendar(18, ""),
        new Calendar(19, ""),
        new Calendar(20, ""),
        new Calendar(21, ""),
        new Calendar(22, ""),
        new Calendar(23, ""),
        new Calendar(24, ""),
        new Calendar(25, ""),
        new Calendar(26, ""),
        new Calendar(27, ""),
        new Calendar(28, ""),
        new Calendar(29, ""),
        new Calendar(30, ""),
        new Calendar(31, ""),
    ];

    getDays() : Observable<Calendar[]> {
        return from([this.days]);
    }
}