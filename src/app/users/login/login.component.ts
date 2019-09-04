import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  flag : boolean = true;
  errorMessageServer: String;
  
  ngOnInit() {
    this.loginData();
  }

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone:NgZone, private router:Router) { }


  loginData(){
    this.loginForm = this.fb.group({
      email:new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), //this is for email validation.
      ])),
      password: new FormControl (null, Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), //this is for the letters both uppercase & lowercase and numbers. 
      ])),
    })
  }

  login(){

    if(this.loginForm.valid){
   // console.log(this.loginForm.value);
    this.api.submitLogin(this.loginForm.value).subscribe((data)=>{ 
      if(data.status =="success"){
      this.ngZone.run(() => this.router.navigateByUrl('/pages'));
    }else if(data.status == "error"){
      this.flag = false;
      this.errorMessageServer = data.message;
    }
    });
  }
}



  validationErrorMessage = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'maxlength', message: 'Password is too large(maximum length 8)' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number, does not contain whiteSpaces' }
    ],
  }

}
