import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Test } from 'src/app/interfaces/testInterface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  isLast: boolean = false;
  tests!: Array<Test>;
  menubarItems!: MenuItem[] | undefined;
  selectedFilter: string = 'All';

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.menubarItems = [
      {
        label: 'Filter',
        items: [
          {
            label: 'All',
          },
          {
            label: 'Own',
          },
          {
            label: 'Collaborating',
          },
        ],
      },
      {
        label: 'Sort',
        items: [
          {
            label: 'By date',
          },
        ],
      },
    ];
    this.loadData();
  }

  loadMoreData(): void {
    if (!this.isLast) {
      this.page += 1;
      this.loadData();
    }
  }

  private loadData(): void {
    this.service.getAllTests(this.page, this.size).subscribe({
      next: (response) => {
        if (!this.tests) {
          this.tests = response.content;
        } else {
          this.tests.push(response.content);
        }
        if (response.last) {
          this.isLast = true;
        }
        console.log(response);
      },
    });
  }
}
