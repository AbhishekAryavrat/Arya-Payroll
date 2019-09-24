import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveApiService } from '../service-leave/leave-api.service';

@Component({
  selector: 'app-update-leave-type',
  templateUrl: 'update-leave-type.component.html'
})

export class UpdateLeaveTypeComponent implements OnInit {

  leaveForm: FormGroup;
  successMsg: String;
  successMessage: boolean = false;
  errMsg: String;
  errorMsg: boolean = false;
  companyNameStore: [];
  showCard: any;
  companyNameId: any;
  public companyName: [];
  public companyId: any;
  public leaveTypeId: any;
  public leaveId;
  leaveData: Object[] = [];
  leaveFormData: Object;

  constructor(
    public fb: FormBuilder,
    private router: Router, private ngZone: NgZone, private route: ActivatedRoute,
    private api: LeaveApiService) { }

  ngOnInit() {
    this.companyDataValidate();
    this.getExistingData();
    this.companyId = this.route.snapshot.paramMap.get("companyId");
    this.leaveTypeId = this.route.snapshot.paramMap.get("leaveTypeId")
  }

  getExistingData() {
    this.api.getListData().subscribe(data => {
      if (data.status == 'success' || data.status == 200) {
        this.leaveFormData = data.leaveTypes;
        const len = Object.keys(this.leaveFormData).length;
        for (var i = 0; i < len; i++) {
          if (this.leaveFormData[i]._id === this.leaveTypeId) {
            this.leaveData.push(this.leaveFormData[i]);
          }
        }
      }
    });
  }

  companyDataValidate() {
    try {
      this.leaveForm = this.fb.group({
        leaveTypeName: new FormControl(null, Validators.required),
        leaveTypeCode: new FormControl(null, Validators.required),
        isPaid: new FormControl(null)
      })
    }
    catch (err) {
      console.log(err.message);
    }
  }


  updateLeaveFormData() {
    try {
      if (this.leaveForm.value) {
        this.api.updateLeaveType(this.leaveForm.value,  this.leaveTypeId).subscribe(data => {
          if (data.status === 'success' || data.status === 200) {
            this.successMessage = true;
            this.ngZone.run(() => this.router.navigateByUrl('/pages/leave-types/list-leave-types'));
            this.errorMsg = false;
            this.successMsg = data.message;
          } else if (data.status == "error") {
            this.errorMsg = true;
            this.successMessage = false;
            this.errMsg = data.message;
          }
        })
      }
    } catch (err) {
      console.log(err.message);
    }

  }

  validationMessage = {
    'leaveTypeName': [
      { type: 'required', message: 'Name is required' },
    ],
    'leaveTypeCode': [{
      type: 'required', message: 'Code is required'
    },],
    'isPaid': [
      { type: 'requird', message: 'This field is required' }
    ],
  }
} 