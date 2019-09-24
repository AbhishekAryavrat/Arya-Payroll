import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { AuthGuard } from 'src/app/authGuard/auth.guard';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { UpdateCompanyListComponent } from './update-company-list/update-company-list.component';



const route : Routes = [
  {
    path :'',
    component : CompanyComponent,
    canActivate:[AuthGuard],
    children :[
      {
        path: 'add-company',
        component: AddCompanyComponent,
      },
      {
        path: 'company-list',
        component: CompanyListComponent,
      },
      {
        path: 'update-company-list/:companyId',
        component:UpdateCompanyListComponent,
      },
      {
        path:'',
        redirectTo :'company-list',
        pathMatch:'full',
      },
    ],
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
  ]
})
export class CompanyRoutingModule { }
