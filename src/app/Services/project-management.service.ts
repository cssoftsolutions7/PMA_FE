import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  private getUsersProjectURL = "https://localhost:7131/Gateway/GetAllProjectsWithTasks";
  

  constructor(private httpClient:HttpClient) { }
  getAllProjects():Observable<any>
  {
    return this.httpClient.get<any>(this.getUsersProjectURL);
  }

  getUsersWithProject(userId:number):Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:7135/api/ProjectManagementTest/project/"+userId+"/users")
  }

  getAllUsersToAssignProject():Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:7135/api/ProjectManagementTest/users")
  }
  assignProjectToUser(payload:any):Observable<any>
  {
    const url = `https://localhost:7135/api/ProjectUser/assign?projectID=${payload.projectID}&userID=${payload.userID}`;
    return this.httpClient.post<any>(url, {});
  }
  removeUserFromAssignedProject(payload:any):Observable<any>
  {
    const url = `https://localhost:7135/api/ProjectUser/remove?projectID=${payload.projectID}&userID=${payload.userID}`;
    return this.httpClient.delete<any>(url);
  }

  editProject(projectPayload:any):Observable<any>
  {
    return this.httpClient.put<any>(`https://localhost:7131/Gateway/editProject/${projectPayload.projectID}`, projectPayload)
  }
}
