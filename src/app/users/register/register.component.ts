import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  signupFlag: boolean = true;
  errMessage: string;
  successFlag:boolean = true;
  successMessage:string;

  ngOnInit() { //Calling validation method
    this.submitData();
  }

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone: NgZone, private router: Router) { }

  //Create method for validation
  submitData() {
    try {
      this.registerForm = this.fb.group({
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

  //Create method for submit input value and calling API
  register() {
    try {
      //console.log(this.registerForm.value);
      this.api.submitSignup(this.registerForm.value).subscribe((data) => {
        //Manage server status when giving error 
        if (data.status === "error" || data.status === 404) {
          this.signupFlag = false;
          this.errMessage = data.message;
          this.successFlag = true;
        }
        //Manage server status when giving success
        else if (data.status === "success" || data.status === 200) {
          this.successFlag = false;
          this.successMessage = data.message;
          this.signupFlag = true;
          setTimeout(()=>{
            this.ngZone.run(() => this.router.navigateByUrl('/users/login'));
          },1000)
        }
      });
    }
    catch (err) {
      console.log(err);
    }

  }

  //For print validation and error message
  validationErrorMessage = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],

  }
}
