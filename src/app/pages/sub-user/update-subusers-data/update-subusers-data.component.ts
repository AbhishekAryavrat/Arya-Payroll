import { Component, OnInit, NgZone } from '@angular/core';
import { SubUserService } from '../sub-user-service/sub-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-subusers-data',
  templateUrl: './update-subusers-data.component.html',
  styleUrls: ['./update-subusers-data.component.scss']
})
export class UpdateSubusersDataComponent implements OnInit {

  snapshotParam: String;
  updateSubUserForm: FormGroup;
  subUserListData: Object;
  subUsersData: Object[] = [];
  successMsg: String;
  successMessage: Boolean = false;
  errMsg: String;
  errorMsg: Boolean = false;
  genderList:String[]= ['Male','Female','Others','N/A']

  constructor(private route: ActivatedRoute, private api: SubUserService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get("subUserId");
    this.subUserFormValidation();
    this.getSubUserExistingData();
  }


  //method for sub user validation
  subUserFormValidation() {
    try {
      this.updateSubUserForm = this.fb.group({
        name: new FormControl(null, Validators.compose([
          Validators.pattern('^[a-zA-Z ]*$'),
        ])),
        phone: new FormControl(null, Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ])),
        birthday: new FormControl(),
        zipCode: new FormControl(null, Validators.compose([
          Validators.pattern('^[0-9]{6}(?:-[0-9]{4})?$'),
        ])),
        gender: new FormControl(),
        email:new FormControl(),
      })
    }
    catch (err) {
      console.log(err);
    }
  }

//Method for Update Sub-User Details
  updateSubUserFormData() {
    try {
      this.api.submitUpdateSubUserData(this.updateSubUserForm.value, this.snapshotParam).subscribe((data) => {
        if (data.status === "success" || data.status === 200) {
          this.router.navigateByUrl('/pages/sub-user/show-subusers-list');
          this.getSubUserExistingData();
          this.successMessage = true;
          this.errorMsg = false;
          this.successMsg = data.message;
        }
        else if (data.status == "error") {
          this.errorMsg = true;
          this.successMessage = false;
          this.errMsg = data.message;
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for Get existing data load on the form(autofill form)
  getSubUserExistingData() {
    try {
      this.api.getSubUsersListData().subscribe(data => {
        if (data.status === "success" || data.status === 200) {
          this.subUserListData = data.users;
          const len = Object.keys(this.subUserListData).length;
          for (var i = 0; i < len; i++) {
            if (this.subUserListData[i]._id === this.snapshotParam) {
              this.subUsersData.push(this.subUserListData[i]);
            }
          }
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  //Property for show error message
  validationMessage = {
    'name': [
      { type: 'pattern', message: 'Not a valid' }
    ],
    'phone': [
      { type: 'minlength', message: 'Not a phone number ' },
      { type: 'maxlength', message: 'Phone no. is too large' },
      { type: 'pattern', message: 'Phone Number not valid' },
    ],
    'zipCode': [
      { type: 'pattern', message: 'ZIP code not valid' },
    ],
  }

}
