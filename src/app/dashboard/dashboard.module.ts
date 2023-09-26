import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnswerComponent } from '../test/answer/answer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [MainComponent, CalendarComponent, CreateTestComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswerComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    SkeletonModule,
    CardModule,
    PanelModule,
    SplitButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    MessagesModule,
  ],
})
export class DashboardModule {}
