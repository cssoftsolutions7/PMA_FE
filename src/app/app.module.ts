import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { DashboardService } from './Services/dashboard.service';
import { LoginService } from './Services/login.service';
import { ProjectManagementService } from './Services/project-management.service';
import { JwtInterceptorService } from './Services/jwt-interceptor.service';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    AdminPanelComponent,
    SideBarComponent,
    ProjectManagementComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DashboardService,LoginService, ProjectManagementService,{provide : HTTP_INTERCEPTORS,useClass:JwtInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
