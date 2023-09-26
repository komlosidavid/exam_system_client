import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';

import { ButtonComponent } from './button/button.component';
import { TestCardComponent } from './test-card/test-card.component';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AnimateModule } from 'primeng/animate';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AnswerComponent } from './answer/answer.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { QuestionComponent } from './question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    NavComponent,
    ButtonComponent,
    TestCardComponent,
    AnswerComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    MenuModule,
    TooltipModule,
    CardModule,
    AvatarModule,
    AnimateModule,
    ProgressBarModule,
    BadgeModule,
    TieredMenuModule,
    RadioButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    MessagesModule,
    InputNumberModule,
    InputTextareaModule,
  ],
  exports: [
    NavComponent,
    ButtonComponent,
    TestCardComponent,
    AnswerComponent,
    QuestionComponent,
  ],
})
export class SharedModule {}
