import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Test } from 'src/app/interfaces/testInterface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  tests!: Array<Test>;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getAllTests().subscribe({
      next: (response) => {
        this.tests = response;
      },
    });
  }
}
