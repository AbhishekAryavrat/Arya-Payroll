import { Component, OnInit } from '@angular/core';
import { LeaveApiService } from '../service-leave/leave-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component ({
    selector: 'app-list-leave-types',
    templateUrl: './list-leave-types.component.html'
})

export class ListLeaveTypesComponent implements OnInit {

    showCard = {};
    leaveListData: Object;
    companyShowData = [];
    constructor(private api: LeaveApiService,public route:Router, private _Activatedroute:ActivatedRoute) {}
    
    ngOnInit() {
      this.leaveList();
    }

    leaveList() {
      try{
        this.api.getListData().subscribe(data => {
          if (data.status === 'success' || data.status === 200) {
            this.leaveListData = data.leaveTypes;
            if(data.leaveTypes.length == 0){
              this.route.navigateByUrl("/pages/leave-types/add-leave-types");
            }
            else{
              const len = Object.keys(this.leaveListData).length;
              for (var i = 0; i < len; i++) {
                this.showCard[this.leaveListData[i]._id] = true;
              }
            }
  
          }    
        })
      }catch(err){
        console.log(err.message);
      }
      
    }
    
    showData(leaveId: String) {
      this.showCard[`${leaveId}`] = !this.showCard[`${leaveId}`];
    }

    showConfirmationMessage(leaveTypeId:String){
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
          this.api.removeData(leaveTypeId).subscribe((data)=>{
            if(data.status === "success" || data.status === 200){
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your list has been deleted.',
            'success'
          )
          this.leaveList();
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
}