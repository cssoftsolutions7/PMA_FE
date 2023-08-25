import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterationForm } from '../Models/user-registeration-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private registrationUrl = "https://localhost:7131/Gateway/Registration";

  constructor(private httpclient:HttpClient) { }

  registerUser(user:UserRegisterationForm):Observable<any>
  {
    return this.httpclient.post<any>(this.registrationUrl, user)
  }
}
