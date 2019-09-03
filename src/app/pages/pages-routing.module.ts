import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes=[
  {
    path :'',
    component : PagesComponent,
    children :[
      {
        path:'dashboard',
        component: DashboardComponent, 
      },
      {
        path:'',
        redirectTo :'dashboard',
        pathMatch:'full',
      },
    ],
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PagesRoutingModule { }
