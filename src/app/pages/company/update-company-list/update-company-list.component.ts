import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyListComponent } from '../../dashboard/company-list/company-list.component';

@Component({
  selector: 'app-update-company-list',
  templateUrl: './update-company-list.component.html',
  styleUrls: ['./update-company-list.component.scss'],
  providers: [CompanyListComponent],
})
export class UpdateCompanyListComponent  implements OnInit {

  updateCompanyForm: FormGroup;
  successMsg: String;
  successMessage: Boolean = false; 
  errMsg: String;
  errorMsg: Boolean = false;
  snapshotParam:String;
  listCompanyData: Object;
  companyData:Object[] = [];

  constructor(private route:ActivatedRoute, private api: ApiService, public fb: FormBuilder, private ngZone: NgZone, private router: Router ) {}

  ngOnInit() { //Calling methods for validation
    this.companyDataValidate();
    this.snapshotParam = this.route.snapshot.paramMap.get("companyId");
    this.getExistingData();
  }

  //Method for Validation
  companyDataValidate() {
    try {
      this.updateCompanyForm = this.fb.group({
        name: new FormControl(),
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
        email: new FormControl(null, Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])),
        fax: new FormControl(null, Validators.compose([
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ])),

        address: new FormControl(),
        domicile: new FormControl(null, Validators.pattern('^[a-zA-Z]*$')),  
        outGoingMails: new FormControl(null, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
        gstNumber: new FormControl(null, Validators.pattern('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')),
        currency: new FormControl(),
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for Update Data 
  updateCompanyFormData() {
    if (this.updateCompanyForm.valid) {
      this.api.submitUpdateCompanyData(this.updateCompanyForm.value,this.snapshotParam).subscribe((data) => {
        if(data.status === "success" || data.status === 200){
          this.successMessage = true ;
          this.errorMsg = false ;
          this.successMsg = data.message;
          setTimeout(() => {
            this.router.navigateByUrl('/pages/dashboard/company-list');
          }, 20000);
          window.location.reload();
          this.getExistingData();
        }
        else if(data.status == "error"){
          this.errorMsg = true; 
          this.successMessage = false;
          this.errMsg = data.message;
        }
      })
    }
  }

  scroll(element) {
    element.scrollIntoView();
}


//Method for Get existing data load on the form(autofill form)
    getExistingData(){
      this.api.getListData().subscribe(data => {
        if(data.status === "success" || data.status === 200){
          this.listCompanyData = data.company;
          const len = Object.keys(this.listCompanyData).length;
          for (var i = 0; i < len; i++) {
            if(this.listCompanyData[i]._id === this.snapshotParam)
            {
              this.companyData.push(this.listCompanyData[i]);
            }
          }
        }
      }) 
    }

    //Method for show validation message
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
