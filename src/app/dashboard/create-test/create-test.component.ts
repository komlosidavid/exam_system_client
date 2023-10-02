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
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/store/reducers/auth.reducers';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

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
  addUserPanelOpen: boolean = false;
  addCollaboratorsPanel: boolean = false;
  addStudentsPanel: boolean = false;

  form!: FormGroup;
  questionHeight!: number;
  teachers!: Array<User>;
  selectedTeachers: Array<User> = new Array<User>();
  draggedTeacher: User | undefined | null;

  constructor(
    private _fb: FormBuilder,
    private service: DashboardService,
    private router: Router,
    private store: Store
  ) {
    this.form = this._fb.group({
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      collaborators: this._fb.array([]),
      students: this._fb.array([]),
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

  get collaborators(): FormArray {
    return this.form.get('collaborators') as FormArray;
  }

  get students(): FormArray {
    return this.form.get('students') as FormArray;
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

  openAddUserPanel(type?: string) {
    this.addUserPanelOpen = true;
    if (type == 'collaborators') {
      this.addCollaboratorsPanel = true;
      this.addStudentsPanel = false;

      this.service.getAllTeachers().subscribe({
        next: (response) => {
          if (this.selectedTeachers.length > 0) {
            this.teachers = response.content.filter(
              (user: User) =>
                !this.isContaining(this.selectedTeachers, user.id!.toString())
            );
          } else {
            this.teachers = response.content;
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
    } else {
      this.addCollaboratorsPanel = false;
      this.addStudentsPanel = true;
    }
  }

  private isContaining(list: Array<User>, id: string) {
    let contains = list.filter((user: User) => user.id?.toString() == id);
    if (contains.length > 0) {
      return true;
    }

    return false;
  }

  dragStart(teacher: User) {
    this.draggedTeacher = teacher;
  }

  drop() {
    if (this.draggedTeacher) {
      let index = this.findIndex(this.draggedTeacher);
      this.selectedTeachers = [
        ...(this.selectedTeachers as User[]),
        this.draggedTeacher,
      ];
      this.teachers = this.teachers.filter((val, i) => i != index);
      this.draggedTeacher = null;
    }
  }

  dragEnd() {
    this.draggedTeacher = null;
  }

  closeAddUserPanel() {
    this.addUserPanelOpen = false;
  }

  scrollDownAfterQuestionCreate(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  }

  deleteFromSelected(
    from: Array<User>,
    to: Array<User>,
    id: string | undefined
  ) {
    to.push(from.filter((user) => user.id == id)[0]);
    this.selectedTeachers = from.filter((user) => user.id != id);
  }

  onHandleDeleteQuestion(id: number, index: number): void {
    this.questions.removeAt(index);
  }

  private findIndex(teacher: User) {
    let index = -1;
    for (let i = 0; i < (this.teachers as User[]).length; i++) {
      if (teacher.id === (this.teachers as User[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onHandleCreateNewTest(): void {
    let creatorId;
    this.store.pipe(select(selectUser)).subscribe((user) => {
      creatorId = user?.id;
    });

    const payload: Test = {
      collaborators: this.selectedTeachers.map(
        (teacher) => teacher.id
      ) as User[],
      creator: creatorId!,
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
      complete: () => {
        this.router.navigateByUrl('/');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
