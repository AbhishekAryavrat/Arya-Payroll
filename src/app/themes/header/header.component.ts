import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  companyListData: Object;
  navbarOpen = false;
  companyName: String;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor( private apiService:ApiService, private route:Router,private ngZone: NgZone,) { }

  ngOnInit() {
    this.getList();
    this.getIndividualList();
  }


  //Method for show data in the list
  getList() {
    try {
      this.apiService.getListData().subscribe(data => {
        if (data.status === 'success' || data.status === 200) {
          if (data.company.length === 0) {
            this.ngZone.run(() => this.route.navigateByUrl('/pages/company/add-company'));
          }else{
            this.companyListData = data.company;
            this.ngZone.run(()=>this.route.navigateByUrl('/pages/dashboard/company-list'));
          }
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

//Method for show dropdown selected value
  getIndividualList(){
    try{
      if(sessionStorage.getItem('companyId') === "undefined"){
        this.companyName = "No Company Added";
      }else{
        this.apiService.getIndividualData(sessionStorage.getItem('companyId')).subscribe((data) => {
          this.companyName = data.data.name;
        })
      }
      
    }catch(err){}
  }

//Method for set selected valuein session storage
 onSelect(companyId){
   try{
  sessionStorage.setItem('companyId',companyId);
  window.location.reload();
   }catch(err){
     console.log(err);
   }
  }

  
  logout():void {
    
    this.apiService.submitLogout();
    this.route.navigateByUrl('/users');
  }
  ngOnDestroy(){

  }

}
