import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes : Routes= [
  {
    path:'',
    component : UsersComponent,
    children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: '',
      redirectTo: 'register',
      pathMatch:'full',
    }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule { }
