import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../themes/header/header.component';
import { SidebarComponent } from '../themes/sidebar/sidebar.component';
import { FooterComponent } from '../themes/footer/footer.component';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
