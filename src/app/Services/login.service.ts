import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../Models/auth-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'https://localhost:7131/Gateway/Authentication';
  
  constructor(private httpClient:HttpClient) { }
  
  loginUser(authReq:AuthRequest):Observable<AuthRequest>
  {
    return this.httpClient.post<AuthRequest>(this.loginUrl, authReq);
  }
}
