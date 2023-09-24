import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [MainComponent, CalendarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    SkeletonModule,
    CardModule,
  ],
})
export class DashboardModule {}
