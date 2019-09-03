import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  form:FormGroup;

  ngOnInit() {
    this.submitData();
  }

  constructor(private api: ApiService, public fb: FormBuilder, private ngZone:NgZone, private router:Router){}
  
    // this.form = new FormGroup({
    //   email: new FormControl()
    // });
    submitData(){
      this.form = this.fb.group({
        email:[''],
      })
    }

    submitForm(){
      console.log(this.form.value);
      this.api.submitData(this.form.value).subscribe((res)=>{
        this.ngZone.run(()=>this.router.navigateByUrl('./login'))
      });
    }


   

}
