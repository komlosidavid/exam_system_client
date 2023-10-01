import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'test',
    loadChildren: () =>
      import('./test/test.module').then((module) => module.TestModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((module) => module.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
