import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassForm: FormGroup;
  errMessage: string;
  successMsg: string;
  forgotFlag: boolean = true;
  flag: boolean = false;

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    this.submitEmail();
  }


  //Create method for validation
  submitEmail() {
    try {
      this.forgotPassForm = this.fb.group({
        email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),

        ])),
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  forgotPassword() {   //Create method for submit form value and calling API.
    try {
      this.api.submitForgotPasswordData(this.forgotPassForm.value).subscribe((data) => {
        if (data.status === "error" || data.status === 404) {
          this.forgotFlag = false;
          this.errMessage = data.message;
          this.flag = false;
        }
        else if (data.status == "success" || data.status === 200) {
          this.flag = true;
          this.successMsg = data.message;
          this.forgotFlag = true;
          setTimeout(() => {
            this.ngZone.run(() => this.router.navigateByUrl('/users/login'));
          }, 1000)
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  //For print Validation and error message.
  validationErrorMessage = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],

  }

}
