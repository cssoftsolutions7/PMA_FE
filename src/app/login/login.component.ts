import { Component } from '@angular/core';
import { AuthRequest } from '../Models/auth-request';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginBody: AuthRequest = new AuthRequest();
  private userRole : string = '';
  constructor(private loginService: LoginService,private router: Router){}

  loginSubmit() {
    this.loginService.loginUser(this.loginBody).subscribe(
      (res)=>{
        console.log(res)
        sessionStorage.setItem('userData', JSON.stringify(res));
        this.loginBody.email = '';
        this.loginBody.password = '';
        const userData = sessionStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          this.userRole = user.role; // Adjust the property name if needed
        }
        // Assuming the role property is named 'userRole' in your response
        if (this.userRole === 'Admin') {
          this.router.navigate(['/adminpanel']); // Redirect to the admin panel
        } else {
          this.router.navigate(['/dashboard']); // Redirect to the dashboard for non-admin users
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  }
}
