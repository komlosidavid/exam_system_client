import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CreateTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class DashboardRoutingModule {}
