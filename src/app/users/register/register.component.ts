import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;
  signupFlag : boolean = true;
  errMessage : string;
  

  ngOnInit() {
    this.submitData();
  }

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone:NgZone, private router:Router){}
  
    submitData(){
      this.registerForm = this.fb.group({
        email:new FormControl (null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
         
        ])),
      })
    }

    register(){
      //console.log(this.registerForm.value);
      this.api.submitSignup(this.registerForm.value).subscribe((data)=>{
        if(data.status == "error"){
            this.signupFlag = false;
            this.errMessage = data.message;
        }
        else if(data.status == "success")
        {
          this.ngZone.run(()=>this.router.navigateByUrl('/users/login'));
        }
      });
      
    }

    validationErrorMessage = {
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
      ],
   
    }
}
