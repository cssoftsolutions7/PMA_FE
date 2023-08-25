import { Component } from '@angular/core';
import { UserRegisterationForm } from '../Models/user-registeration-form';
import { UserRegistrationService } from '../Services/user-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  user:UserRegisterationForm = new UserRegisterationForm();
  constructor(private registerService:UserRegistrationService, private router: Router){}
  
registerSubmit() {
  this.registerService.registerUser(this.user).subscribe(
    (res)=>{
      console.log("registered successfully!");
      this.user.email = '';
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.password = '';
      this.router.navigate(['/login'])
    },
    (err)=>{
      console.log(err)
    }
  )
}
}
