import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'users',
    loadChildren:() => import('../app/users/users.module')
    .then(m => m.UsersModule),
  },
  {
    path: 'pages',
    loadChildren:() => import ('../app/pages/pages.module')
    .then(m=>m.PagesModule),
  },
  {
    path:'',
    redirectTo:'users',
    pathMatch:'full',
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch:'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
