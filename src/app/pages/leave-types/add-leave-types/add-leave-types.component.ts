import { Component, OnInit,NgZone } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveApiService } from '../service-leave/leave-api.service';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-add-leave-types',
    templateUrl: './add-leave-types.component.html'
})

export class AddLeaveTypesComponent implements OnInit {
    
    leaveForm: FormGroup;
    successMsg: String;
    successMessage: boolean = false; 
    errMsg: String;
    errorMsg: boolean = false;
    companyNameStore: any;
    showCard: any;
    companyListData: Object;
    companyNameId: any;
    public companyName: [];
    public companyId: any;

    constructor(private _api: ApiService, 
      public fb: FormBuilder, 
      private ngZone: NgZone, 
      private router: Router,
      private api: LeaveApiService){}

    ngOnInit() {
      this.companyDataValidate();
    }

    companyDataValidate() {
      try {
        this.leaveForm = this.fb.group({
          leaveTypeName: new FormControl(null,Validators.required),
          leaveTypeCode: new FormControl(null,Validators.required),
            isPaid: new FormControl(null)
          })
        }
      catch (err) {
        console.log(err);
      }
    }

    // companyValue() {
    //   this._api.getListData().subscribe(data =>{
    //     if(data.status == 'success' || data.status == 200) {
    //       this.companyNameStore = data.company;
    //     }
    //   })
    // }

    // onChangeCompany(value:String) {
    //   this.companyId = value;
    //   console.log(this.companyId);
    // }

    leaveFormData() {
      if (this.leaveForm.value) {
        this.api.leaveDataSubmit(this.leaveForm.value).subscribe((data) => {
          if(data.status === "success" || data.status === 200){
            this.successMessage = true ;
            this.ngZone.run(()=>this.router.navigateByUrl('/pages/leave-types/list-leave-types'));
            this.errorMsg = false ;
            this.successMsg = data.message;
          }
          else if(data.status === "error"|| data.status === 404){
            this.errorMsg = true; 
            this.successMessage = false;
            this.errMsg = data.message;
          }
        })
      }
    }
    
    validationMessage = {
      'leaveTypeName': [
        { type: 'required', message: 'Name is required' },
      ],
      'coleaveTypeCodede':[{
        type: 'required', message: 'Code is required'
      },],
      'companyId':[
        {type:'requird',message: 'Company is required'},
      ],
      'isPaid':[
        {type:'requird', message: 'This field is required'}
      ],
    }
}