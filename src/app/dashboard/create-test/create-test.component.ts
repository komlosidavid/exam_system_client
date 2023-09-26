import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { Test } from 'src/app/models/test.model';
import { DashboardService } from '../dashboard.service';
import { MenuItem, Message } from 'primeng/api';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements AfterViewChecked {
  isEditTitle: boolean = false;
  isRendered: boolean = false;
  items: MenuItem[];
  testErrorMessage: Message[];
  testFormErrorMessage: Message[];

  form!: FormGroup;
  questionHeight!: number;

  constructor(private _fb: FormBuilder, private service: DashboardService) {
    this.form = this._fb.group({
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      questions: this._fb.array([]),
    });

    this.items = [
      {
        label: 'Multiple answers',
        icon: 'pi pi-check-square',
        command: () => this.addNewQuestion('multiple_answers'),
      },
      {
        label: 'Explanatory',
        icon: 'pi pi-book',
        command: () => this.addNewQuestion('explanatory_answer'),
      },
    ];

    this.testErrorMessage = [
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'Test should contain at least one question!',
      },
    ];

    this.testFormErrorMessage = [
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'There is something wrong with your test!',
      },
    ];

    this.form.valueChanges.subscribe((event) => {
      if (this.questions.length < 1) {
        this.form.setErrors({
          error: 'Test should contain at least one question!',
        });
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.isRendered) {
      this.scrollDownAfterQuestionCreate();
      this.isRendered = false;
    }
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  onHandleEditTitle(): void {
    this.isEditTitle = !this.isEditTitle;
  }

  addNewQuestion(type: string): void {
    if (type == 'one_answer' || type == 'multiple_answers') {
      this.createQuestionWithTwoAnswers(type);
    } else if (type == 'explanatory_answer') {
      this.createQuestionWithTextarea();
    }
    this.isRendered = true;
  }

  private createQuestionWithTwoAnswers(type: string) {
    this.questions.push(
      this._fb.group({
        id: [Math.floor(Math.random() * 1000) + 1],
        type: [type],
        question: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ])
        ),
        points: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.maxLength(3)])
        ),
        answers: this._fb.array([
          this._fb.group({
            id: [Math.floor(Math.random() * 1000) + 1],
            type: [type],
            answerSelect: new FormControl({ value: '', disabled: true }),
            isCorrect: new FormControl(false),
            answer: new FormControl(
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(255),
              ])
            ),
          }),
          this._fb.group({
            id: [Math.floor(Math.random() * 1000) + 1],
            type: [type],
            answerSelect: new FormControl({ value: '', disabled: true }),
            isCorrect: new FormControl(false),
            answer: new FormControl(
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(255),
              ])
            ),
          }),
        ]),
      })
    );
  }

  private createQuestionWithTextarea() {
    this.questions.push(
      this._fb.group({
        id: [Math.floor(Math.random() * 1000) + 1],
        type: ['explanatory_answer'],
        question: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ])
        ),
        points: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.maxLength(3)])
        ),
        answer: this._fb.group({
          id: [Math.floor(Math.random() * 1000) + 1],
          type: ['explanatory_answer'],
          max: new FormControl('', Validators.compose([Validators.required])),
          answer: new FormControl({ value: '', disabled: true }),
        }),
      })
    );
  }

  scrollDownAfterQuestionCreate(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  }

  onHandleDeleteQuestion(id: number, index: number): void {
    this.questions.removeAt(index);
  }

  onHandleCreateNewTest(): void {
    const payload: Test = {
      collaborators: [],
      creator: '49454384-37f7-48d1-8de4-4d36acbab6a8',
      finishedStudents: 0,
      students: [],
      subject: this.form.get('subject')?.value,
      questions: this.questions.value.map((questionControl: Question) => {
        const question: Question = {
          question: questionControl.question,
          points: 0,
          type: questionControl.type.toUpperCase(),
          answers: questionControl.answers.map((answerControl: Answer) => {
            return {
              isCorrect: answerControl.isCorrect,
              answer: answerControl.answer,
              type: answerControl.type.toUpperCase(),
            };
          }),
        };
        return question;
      }),
    };

    console.log(JSON.stringify(payload));
    this.service.createTest(payload).subscribe({
      error: (response) => {
        console.log(response);
      },
    });
  }
}
