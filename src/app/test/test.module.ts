import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { QuestionComponent } from './question/question.component';

import { AnswerComponent } from './answer/answer.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [QuestionComponent, AnswerComponent, TestComponent],
  imports: [CommonModule, TestRoutingModule],
})
export class TestModule {}
