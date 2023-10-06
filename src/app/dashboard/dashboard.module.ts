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
import { DragDropModule } from 'primeng/dragdrop';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AddUserComponent } from './add-user/add-user.component';
import { CarouselModule } from 'primeng/carousel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    MainComponent,
    CalendarComponent,
    CreateTestComponent,
    AddUserComponent,
    SummaryComponent,
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
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,
    ScrollPanelModule,
  ],
})
export class DashboardModule {}
