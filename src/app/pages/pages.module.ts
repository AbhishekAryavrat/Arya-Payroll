import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../themes/header/header.component';
import { SidebarComponent } from '../themes/sidebar/sidebar.component';
import { FooterComponent } from '../themes/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule
  ]
})
export class PagesModule { }
