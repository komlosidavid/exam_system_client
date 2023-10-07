import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent {
  @Input()
  answerGroup!: FormGroup;

  @Output()
  makeCorrect: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  deleteAnswer: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onHandleMakeAnswerCorrectnessFalse: EventEmitter<void> =
    new EventEmitter<void>();

  toggleCorrectness(group: FormGroup): void {
    if (group.get('type')?.value == 'one_answer') {
      this.onHandleMakeAnswerCorrectnessFalse.emit();
      const isCorrectControl = group.get('correct');
      isCorrectControl!.setValue(!isCorrectControl!.value);
    } else {
      const isCorrectControl = group.get('correct');
      isCorrectControl!.setValue(!isCorrectControl!.value);
    }
  }

  onHandleDeleteAnswer(id: number): void {
    this.deleteAnswer.emit(id);
  }
}
