import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Test } from 'src/app/interfaces/testInterface';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  filteredTests!: Array<Test>;
  menubarItems!: MenuItem[] | undefined;
  selectedFilter: string = 'All';
  isLoading: boolean = true;
  isAllWasNull: boolean = true;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    var that = this;
    this.menubarItems = [
      {
        label: 'Filter',
        icon: 'pi pi-filter',
        disabled: false,
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
        disabled: false,
        items: [
          {
            label: 'By date',
          },
        ],
      },
    ];
    this.loadData(false);
  }

  private setFilterAndSortDisabled() {
    if (!this.isAllWasNull) {
      this.menubarItems?.forEach((item) => {
        item.disabled = true;
      });
      this.tests = null;
    }
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
            this.setFilterAndSortDisabled();
          } else {
            if (!this.tests) {
              this.tests = response.content;
            } else {
              this.tests.push(response.content);
            }
          }
          if (response.last) {
            this.isLast = true;
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
