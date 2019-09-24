import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch-service/branch.service';


@Component({
  selector: 'app-update-branch-data',
  templateUrl: './update-branch-data.component.html',
  styleUrls: ['./update-branch-data.component.scss']
})
export class UpdateBranchDataComponent implements OnInit {

  updateBranchForm: FormGroup;
  getBranchList: Object;
  branchData: Object[] = [];
  snapshotParam: String;
  currency = ['USD', 'INR'];
  successMsg: String;
  successMessage: boolean = false;
  errMsg: String;
  errorMsg: boolean = false;

  constructor(private route: ActivatedRoute, private api: BranchService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.updateBranchDataValidate();
    this.getExistingData()
    this.snapshotParam = this.route.snapshot.paramMap.get("branchId");
  }

  //Method for Validation
  updateBranchDataValidate() {
    try {
      this.updateBranchForm = this.fb.group({
        name: new FormControl(null, Validators.compose([
        ])),
        phone: new FormControl(null, Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ])),
        officialNumber: new FormControl(null, Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
        ])),
        fax: new FormControl(null, Validators.compose([
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ])),
        address: new FormControl(null),
        outGoingMails: new FormControl(null, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
        gstNumber: new FormControl(null, Validators.pattern('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')),
        currency: new FormControl('INR'),
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  scroll(element) {
    element.scrollIntoView();
}

  //Method for get existing data show on update form
  getExistingData() {
    this.api.getBranchListData().subscribe((data) => {
      if (data.status === "success" || data.status === 200) {
        this.getBranchList = data.branch;
        const len = Object.keys(this.getBranchList).length;
        for (var i = 0; i < len; i++) {
          if (this.getBranchList[i]._id === this.snapshotParam) {
            this.branchData.push(this.getBranchList[i]);
          }
        }
      }
    })
  }

  //Method for submit updated form data
  updateBranchFormData() {
    try {
      if (this.updateBranchForm.valid) {
        this.api.submitUpdatedData(this.updateBranchForm.value, this.snapshotParam).subscribe((data) => {
          if (data.status === "success" || data.status === 200) {
            this.successMessage = true;
            this.errorMsg = false;
            this.successMsg = data.message;
            setTimeout(() => {
              this.router.navigateByUrl("/pages/branches/show-branches");
            }, 1000);
          }
          else if (data.status === "error" || data.status === 404) {
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





  //Method for show validdation message
  validationMessage = {
    'phone': [
      { type: 'minlength', message: 'Not a phone number ' },
      { type: 'maxlength', message: 'Phone no. is too large' },
      { type: 'pattern', message: 'Phone Number not valid' },
    ],
    'officialNumber': [
      { type: 'minlength', message: 'Number too short ' },
      { type: 'maxlength', message: 'Number is too large' },
      { type: 'pattern', message: 'Company Number not valid' },
    ],
    'fax': [
      { type: 'minlength', message: 'Fax number too short ' },
      { type: 'maxlength', message: 'Fax no. is too large' },
      { type: 'pattern', message: 'Fax Number not valid' },
    ],
    'outGoingMails': [
      { type: 'pattern', message: 'Invalid Mail' },
    ],
    'gstNumber': [
      { type: 'pattern', message: 'Invalid GST No.' },
    ],
  }
}
