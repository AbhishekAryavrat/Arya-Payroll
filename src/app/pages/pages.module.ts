import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../themes/header/header.component';
import { SidebarComponent } from '../themes/sidebar/sidebar.component';
import { FooterComponent } from '../themes/footer/footer.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [HeaderComponent,SidebarComponent,FooterComponent,PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PagesModule { }
