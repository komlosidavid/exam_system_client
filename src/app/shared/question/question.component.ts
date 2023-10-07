import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input()
  questionGroup!: FormGroup;

  @Output()
  deleteQuestion: EventEmitter<number> = new EventEmitter<number>();

  questionErrorMessage: Message[];
  questionCorrectErrorMessage: Message[];
  isEditing: boolean = false;

  constructor(private _fb: FormBuilder) {
    this.questionErrorMessage = [
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'Question should contain at least two answers!',
      },
    ];

    this.questionCorrectErrorMessage = [
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'You should check one answer to be correct!',
      },
    ];
  }

  ngOnInit(): void {
    if (
      this.questionGroup.get('type')?.value == 'one_answer' ||
      this.questionGroup.get('type')?.value == 'multiple_answers'
    ) {
      this.questionGroup.valueChanges.subscribe((event) => {
        if (this.answers.length < 2) {
          this.questionGroup.setErrors({
            error: 'Question should contain at least two answers!',
          });
        }
        if (this.questionGroup.get('type')?.value == 'one_answer') {
          if (
            this.answers.controls.filter(
              (control) => control.get('correct')?.value
            ).length == 0
          ) {
            this.questionGroup.setErrors({
              error: 'correct',
            });
          }
        }
      });
    }
  }

  get answers(): FormArray {
    return this.questionGroup.get('answers') as FormArray;
  }

  onToggleEditQuestion(): void {
    this.isEditing = !this.isEditing;
  }

  onHandleDeleteAnswer(id: number, index: number): void {
    this.answers.removeAt(index);
  }

  onHandleAddNewAnswer(): void {
    this.answers.push(
      this._fb.group({
        id: [Math.floor(Math.random() * 1000) + 1],
        type: [this.questionGroup.get('type')?.value],
        answerSelect: new FormControl({ value: '', disabled: true }),
        correct: new FormControl(false),
        answer: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ])
        ),
      })
    );
  }

  makeAnswersIncorrect(): void {
    this.answers.controls.forEach((answer) => {
      answer.get('correct')?.setValue(false);
    });
  }

  onHandleDeleteQuestion(id: number): void {
    this.deleteQuestion.emit(id);
  }
}
