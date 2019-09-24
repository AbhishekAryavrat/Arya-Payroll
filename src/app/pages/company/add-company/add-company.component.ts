import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyForm: FormGroup;
  successMsg: String;
  successMessage: boolean = false; 
  errMsg: String;
  errorMsg: boolean = false;
  currency=['USD','INR'];

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { 
  }

  ngOnInit() {
    this.companyDataValidate();
  }

  //Method for Validation
  companyDataValidate() {
    try {
      this.companyForm = this.fb.group({
        name: new FormControl(null, Validators.compose([
          Validators.required,
        ])),
        phone: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ])),
        officialNumber: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
        ])),
        email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])),
        fax: new FormControl(null, Validators.compose([
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ])),
        address: new FormControl(null, Validators.required),
        domicile: new FormControl(null, Validators.pattern('^[a-zA-Z]*$')),  
        outGoingMails: new FormControl(null, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
        gstNumber: new FormControl(null, Validators.pattern('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')),
        currency:new FormControl('INR'),
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  scroll(element) {
    element.scrollIntoView();
}

//Method for submit new company list data
  companyFormData() {
    try{
    if (this.companyForm.valid) {
      this.api.submitCompanyData(this.companyForm.value).subscribe((data) => {
        if(data.status == "success"){
          this.successMessage = true ;
          setTimeout(() => {
            this.ngZone.run(()=>this.router.navigateByUrl('/pages/dashboard/company-list'));
          },1500);
          window.location.reload();
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
  }
  catch(err){
    console.log(err);
  }
  }

//Method for show validdation message
  validationMessage = {
    'name': [
      { type: 'required', message: 'Name is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'address':[
      { type: 'required', message: 'Address is required' },
    ],
    'phone': [
      { type: 'required', message: 'Phone No. is required' },
      { type: 'minlength', message: 'Not a phone number ' },
      { type: 'maxlength', message: 'Phone no. is too large' },
      { type: 'pattern', message: 'Phone Number not valid' },
    ],
    'officialNumber': [
      { type: 'required', message: 'Number is required' },
      { type: 'minlength', message: 'Number too short ' },
      { type: 'maxlength', message: 'Number is too large' },
      { type: 'pattern', message: 'Company Number not valid' },
    ],
    'fax': [
      { type: 'minlength', message: 'Fax number too short ' },
      { type: 'maxlength', message: 'Fax no. is too large' },
      { type: 'pattern', message: 'Fax Number not valid' },
    ],
    'domicile':[
      { type: 'pattern', message: 'Invalid Domicile'},
    ],
    'outGoingMails':[
      { type: 'pattern', message: 'Invalid Mail'},
    ],
    'gstNumber':[
      { type: 'pattern', message: 'Invalid GST No.'},
    ],
  }
}
