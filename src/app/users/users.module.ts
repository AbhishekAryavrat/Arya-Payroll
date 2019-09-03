import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, UsersComponent, RegisterComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class UsersModule { }
