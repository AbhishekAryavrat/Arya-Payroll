import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { UpdateCompanyListComponent } from './update-company-list/update-company-list.component';

@NgModule({
  declarations: [AddCompanyComponent,CompanyComponent,CompanyListComponent, UpdateCompanyListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CompanyModule { }
