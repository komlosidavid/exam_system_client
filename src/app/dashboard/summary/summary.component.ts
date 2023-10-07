import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Message } from 'primeng/api';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { Test } from 'src/app/models/test.model';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/store/reducers/auth.reducers';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Input()
  selectedCollaborators!: Array<User>;
  @Input()
  selectedStudents!: Array<User>;
  @Input()
  questions!: FormArray;
  @Input()
  form!: FormGroup;

  testFormErrorMessage!: Message[];

  constructor(
    private store: Store,
    private service: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testFormErrorMessage = [
      {
        severity: 'warn',
        summary: 'Warning',
        detail: 'There is something wrong with your test!',
      },
    ];
  }

  onHandleCreateNewTest(): void {
    let creatorId;
    this.store.pipe(select(selectUser)).subscribe((user) => {
      creatorId = user?.id;
    });

    const payload: Test = {
      collaborators: this.selectedCollaborators.map(
        (teacher) => teacher.id
      ) as User[],
      creator: creatorId!,
      finishedStudents: 0,
      opensAt: this.form.get('opensAt')?.value,
      students: this.selectedStudents.map((student) => student.id) as User[],
      subject: this.form.get('subject')?.value,
      questions: this.questions.controls.map(
        (questionControl: AbstractControl) => {
          const question: Question = {
            question: questionControl.get('question')?.value,
            points: questionControl.get('points')?.value,
            type: questionControl.get('type')?.value.toUpperCase(),
            answers: questionControl
              .get('answers')
              ?.value.map((answerControl: Answer) => {
                return {
                  coorect: answerControl.correct,
                  answer: answerControl.answer,
                  type: answerControl.type.toUpperCase(),
                };
              }),
          };
          return question;
        }
      ),
    };

    console.log(payload);

    this.service.createTest(payload).subscribe({
      complete: () => {
        this.router.navigateByUrl('/');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
