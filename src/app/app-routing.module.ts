import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {path: "login",component:LoginComponent},
  {path: "dashboard",component:DashboardComponent},
  {path: "adminpanel",component:AdminPanelComponent},
  {path: "sidebar",component:SideBarComponent},
  {path: "projectmanagement",component:ProjectManagementComponent},
  {path: "userregister",component:UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
