import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
}
