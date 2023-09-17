import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { EventColor } from 'calendar-utils';
import { CalendarView, CalendarEvent } from 'angular-calendar';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  // view: CalendarView = CalendarView.Month;

  // CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };
}
