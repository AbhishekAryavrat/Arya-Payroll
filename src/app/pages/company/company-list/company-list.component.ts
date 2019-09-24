import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  showCard = {};
  companyListData: Object;
  individualCompanyData = [];
  companyData: String;


  constructor(private api: ApiService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { 
   }

 async ngOnInit() {
   await this.getList();
  }

  //Method for show data in the list
  getList() {
    try {
      this.api.getListData().subscribe(data => {
        if (data.status === 'success' || data.status === 200) {
          if (data.company.length === 0) {
            this.ngZone.run(() => this.router.navigateByUrl('/pages/company/add-company'));
          } else {
            this.companyListData = data.company;
            sessionStorage.setItem('companyId',this.companyListData[0]._id);
            this.individualCompanyData.push(this.companyListData[0]);
          }
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }


  //Method for onclick data show when collapse
  showData(companyId: String) {
    try {
      this.showCard[`${companyId}`] = !this.showCard[`${companyId}`];
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for remove company list
  showConfirmationMessage(companyId: String) {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You want to delete it",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.api.removeData(companyId).subscribe((data) => {
            if (data.status === "success" || data.status === 200) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                data.message,
                'success'
              )
              this.getList();
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your list data safe',
            'error'
          )
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

}
