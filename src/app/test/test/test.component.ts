import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/test.model';
import { TestService } from '../test.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  test!: Test;
  form!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TestService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getTestById(id!).subscribe({
      next: (data) => {
        this.test = data;

        this.form = this._fb.group({
          subject: this.test.subject,
          questions: this._fb.array([]),
        });

        this.test.questions.forEach((question) => {
          const answersTemp: FormArray = this._fb.array([]);
          question.answers.forEach((answer) => {
            answersTemp.push(
              this._fb.group({
                type: answer.type.toLowerCase(),
                answerSelect: new FormControl({ value: '', disabled: false }),
                answer: answer.answer,
              })
            );
          });

          this.questions.push(
            this._fb.group({
              type: question.type.toLowerCase(),
              question: question.question,
              points: question.points,
              answers: answersTemp,
            })
          );
        });
      },
    });
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }
}
