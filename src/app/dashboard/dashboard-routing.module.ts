import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TestComponent } from '../test/test/test.component';
import { EditTestComponent } from './edit-test/edit-test.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CreateTestComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'edit/:id', component: EditTestComponent },
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
