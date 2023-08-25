import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private getUsersProjectURL = "https://localhost:7135/api/ProjectManagementTest/user/";

  constructor(private httpClient:HttpClient) { }

  getAllProjectOfUser(id:number):Observable<any>
  {
    return this.httpClient.get<any>(this.getUsersProjectURL + id);
  }
}
