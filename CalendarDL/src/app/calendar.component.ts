import {Component, OnChanges, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
mDate: moment.Moment;
selected?: boolean;
today?: boolean;
}

@Component ({
    selector: 'app-calendar',
    templateUrl: './app.calendar.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, OnChanges {
    currentDate = moment();
    dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    weeks: CalendarDate[][] = [];
    sortedDates: CalendarDate[] = [];

    @Input() selectedDates: CalendarDate[] = [];
    @Output() onSelectDate = new EventEmitter<CalendarDate>();
    
    constructor() {}

    ngOnInit(): void {
        this.generateCalendar();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.selectedDates &&
            changes.selectedDates.currentValue &&
            changes.selectedDates.currentValue.length > 1) {
                this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => 
                m.mDate.valueOf());
                this.generateCalendar();
            }
    }

    prevMonth(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.generateCalendar();
    }

    nextMonth(): void {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
    }

    prevYear(): void {
        this.currentDate = moment(this.currentDate).subtract(1, 'year');
        this.generateCalendar();
    }

    nextYear(): void {
        this.currentDate = moment(this.currentDate).add(1, 'year');
        this.generateCalendar();
    }

    isToday(date: moment.Moment): boolean {
        return moment().isSame(moment(date), 'day');
    }

    isSelectedMonth(date: moment.Moment): boolean {
        return moment(date).isSame(this.currentDate, 'month');
    }

    isSelected(date: moment.Moment): boolean {
        return _.findIndex(this.selectedDates, (selectedDate) => {
            return moment(date).isSame(selectedDate.mDate, 'day');
        } ) > -1;
    }

    selectDate(date: CalendarDate): void {
        this.onSelectDate.emit(date);
    }

    firstMonth(): void {
        this.currentDate = moment(this.currentDate).startOf('year');
        this.generateCalendar();
    }

    lastMonth(): void {
        this.currentDate = moment(this.currentDate).endOf('year');
        this.generateCalendar();
    }

    
 
    generateCalendar(): void {
        const dates = this.fillDates(this.currentDate);
        const weeks: CalendarDate[][] = [];
        while (dates.length > 0) {
            weeks.push(dates.splice(0, 7));
        }
        this.weeks = weeks;
    }
    fillDates(currentMoment: moment.Moment): CalendarDate[]{
        const firstOfMonth = moment(currentMoment).startOf('month').day();
        const firstOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
        const start = firstOfGrid.date();
        return _.range(start, start + 42)
        .map((date: number): CalendarDate => {
            const d = moment(firstOfGrid).date(date);
            return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
            };
        });
    }
}
