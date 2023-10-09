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
import { TestSettingsComponent } from './test-settings/test-settings.component';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditTestComponent } from './edit-test/edit-test.component';

@NgModule({
  declarations: [
    MainComponent,
    CalendarComponent,
    CreateTestComponent,
    AddUserComponent,
    SummaryComponent,
    TestSettingsComponent,
    EditTestComponent,
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
    DialogModule,
    InputSwitchModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
  ],
})
export class DashboardModule {}
