import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'sub-user',
        loadChildren: () => import('./sub-user/sub-user.module')
          .then(m => m.SubUserModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module')
          .then(m => m.CompanyModule),
      },
      {
        path: 'branches',
        loadChildren: () => import('./branches/branches.module')
          .then(m => m.BranchesModule)
      },
      {
        path: 'leave-types',
        loadChildren: () => import('./leave-types/leave-types.module')
          .then(m => m.LeavetypesModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'sub-user',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'branches',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'leave-types',
        pathMatch: 'full',
      },

    ],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PagesRoutingModule { }
