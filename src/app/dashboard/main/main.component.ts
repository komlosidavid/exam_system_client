import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  isLast: boolean = false;
  tests!: Array<Test> | null;
  menubarItems!: MenuItem[] | undefined;
  selectedFilter: string = 'All';

  constructor(private service: DashboardService, private router: Router) {}

  ngOnInit(): void {
    var that = this;
    this.menubarItems = [
      {
        label: 'Filter',
        icon: 'pi pi-filter',
        disabled: this.handleFilterDisabling(),
        items: [
          {
            label: 'All',
            command(event) {
              that.handleFilterChange(event.item?.label!);
            },
          },
          {
            label: 'Own',
            command(event) {
              that.handleFilterChange(event.item?.label!);
            },
          },
          {
            label: 'Collaborating',
            command(event) {
              that.handleFilterChange(event.item?.label!);
            },
          },
        ],
      },
      {
        label: 'Sort',
        icon: 'pi pi-sort',
        disabled: this.handleFilterDisabling(),
        items: [
          {
            label: 'By date',
          },
        ],
      },
    ];
    this.loadData(false);
  }

  handleFilterDisabling(): boolean {
    if (!this.tests || this.tests.length == 0) {
      return true;
    }
    return false;
  }

  handleRenewFilterDisabling(): void {
    this.menubarItems?.forEach((item) => {
      item.disabled = this.handleFilterDisabling();
    });
  }

  loadMoreData(): void {
    if (!this.isLast) {
      this.page += 1;
      this.loadData(false);
    }
  }

  private handleFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.loadData(true);
  }

  private loadData(isFilterChanged: boolean): void {
    if (isFilterChanged) {
      this.tests = null;
    }
    this.service
      .getAllTests(this.page, this.size, this.selectedFilter.toUpperCase())
      .subscribe({
        next: (response) => {
          if (response.content.length == 0) {
            this.tests = new Array();
          } else {
            if (!this.tests) {
              this.tests = response.content;
            } else {
              this.tests.push(response.content);
            }
            this.handleRenewFilterDisabling();
          }
          if (response.last) {
            this.isLast = true;
          }
        },
        complete: () => {
          // this.isLoading = false;
        },
      });
  }

  onHandleNavigateToCreateNewTest(): void {
    this.router.navigateByUrl('dashboard/create');
  }
}
