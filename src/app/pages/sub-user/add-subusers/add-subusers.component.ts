import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubUserService } from '../sub-user-service/sub-user.service';

@Component({
  selector: 'app-add-subusers',
  templateUrl: './add-subusers.component.html',
  styleUrls: ['./add-subusers.component.scss']
})
export class AddSubusersComponent implements OnInit {

  subUserForm: FormGroup;
  successMsg: String;
  successMessage: boolean = false; 
  errMsg: String;
  errorMsg: boolean = false;
  genderList:String[]= ['Male','Female','Others','N/A']

  constructor(public fb: FormBuilder, private api:SubUserService,private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.subUserFormValidation();
  }

  //method for sub user validation
  subUserFormValidation(){
    try{
    this.subUserForm = this.fb.group({
    name:new FormControl(null,Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
      ])),
      email:new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
    })
  }
  catch(err){
    console.log(err);
  }
}

//Method for submit add new sub-users form data an
subUserFormData(){
    this.api.addSubUsersData(this.subUserForm.value).subscribe((data)=>{
      if(data.status === "success"|| data.status === 200){
        this.successMessage = true ;
        this.ngZone.run(()=>this.router.navigateByUrl('/pages/sub-user/show-subusers-list'));
        this.errorMsg = false ;
        this.successMsg = data.message;
      }
      else if(data.status == "error"){
        this.errorMsg = true; 
        this.successMessage = false;
        this.errMsg = data.message;
      }
    })
  }


//Property for show error message
validationMessage = {
  'name': [
    { type: 'required', message: 'Name is required' },
    { type: 'pattern', message: 'Not a valid' }
  ],
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  'phone': [
    { type: 'required', message: 'Phone No. is required' },
    { type: 'minlength', message: 'Not a phone number ' },
    { type: 'maxlength', message: 'Phone no. is too large' },
    { type: 'pattern', message: 'Phone Number not valid' },
  ],
}

}
