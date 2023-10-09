import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TestSettings } from '../test-settings/test-settings.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuItem, Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit {
  isEditTitle: boolean = false;
  isRendered: boolean = false;
  isChangeTestDetailsModalOpen: boolean = false;
  items: MenuItem[];
  testErrorMessage: Message[];
  addUserPanelOpen: boolean = false;
  addCollaboratorsPanel: boolean = false;
  addStudentsPanel: boolean = false;

  form!: FormGroup;
  questionHeight!: number;
  selectedCollaborators: Array<User> = new Array<User>();
  selectedStudents: Array<User> = new Array<User>();

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private service: DashboardService
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
      opensAt: [new Date()],
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

    this.form.valueChanges.subscribe((event) => {
      if (this.questions.length < 1) {
        this.form.setErrors({
          error: 'Test should contain at least one question!',
        });
      }
    });
  }

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    this.service.getTestById(testId!).subscribe({
      next: (data) => {
        this.selectedCollaborators = data.collaborators;
        this.selectedStudents = data.students;

        this.form.get('subject')?.setValue(data.subject);
        data.questions.forEach((question) => {
          const answersTemp: FormArray = this._fb.array([]);
          question.answers.forEach((answer) => {
            answersTemp.push(
              this._fb.group({
                id: answer.id,
                type: answer.type.toLowerCase(),
                answerSelect: new FormControl({ value: '', disabled: true }),
                correct: new FormControl(answer.correct),
                answer: new FormControl(
                  answer.answer,
                  Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(255),
                  ])
                ),
              })
            );
          });

          this.questions.push(
            this._fb.group({
              id: question.id,
              type: question.type.toLowerCase(),
              question: new FormControl(
                question.question,
                Validators.compose([
                  Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(255),
                ])
              ),
              points: new FormControl(
                question.points,
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(3),
                ])
              ),
              answers: answersTemp,
            })
          );
        });
      },
      error: (response) => {
        console.log(response);
      },
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

  addToCollaborators(collaborators: Array<User>): void {
    this.selectedCollaborators = collaborators;
  }

  addToStudents(students: Array<User>) {
    this.selectedStudents = students;
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
            correct: new FormControl(false),
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
            correct: new FormControl(false),
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
        answer: this._fb.array([
          this._fb.group({
            id: [Math.floor(Math.random() * 1000) + 1],
            type: ['explanatory_answer'],
            max: new FormControl('', Validators.compose([Validators.required])),
            answer: new FormControl({ value: '', disabled: true }),
          }),
        ]),
      })
    );
  }

  openAddUserPanel(type?: string) {
    this.addUserPanelOpen = true;
    if (type == 'collaborators') {
      this.addCollaboratorsPanel = true;
      this.addStudentsPanel = false;
    } else {
      this.addCollaboratorsPanel = false;
      this.addStudentsPanel = true;
    }
  }

  onHandlechangeTestDetails(): void {
    this.isChangeTestDetailsModalOpen = !this.isChangeTestDetailsModalOpen;
  }

  closeAddUserPanel() {
    this.addUserPanelOpen = false;
  }

  scrollDownAfterQuestionCreate(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  }

  handleTestSettingsChange(settings: TestSettings) {
    this.form.get('opensAt')?.setValue(new Date(settings.opensAt));
    console.log(this.form.get('opensAt'));
  }

  onHandleDeleteQuestion(id: number, index: number): void {
    this.questions.removeAt(index);
  }
}
