import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectManagementService } from '../Services/project-management.service';
import { PayLoadForAssigningProject } from '../Models/pay-load-for-assigning-project';
import { DatePipe } from '@angular/common';
import { ProjectPayload } from '../Models/project-payload';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
  providers: [DatePipe]
})
export class ProjectManagementComponent implements OnInit, AfterViewInit {

  //===============================================Projects===========================================
  projects: any[] = [];
  selectedProjectId: any;
  selectedProject: any;
  userListOfProject: any;

  //===============================================Users==============================================
  allUsers: any[] = [];


  //===================================For Assign or Unassign Project==================================
  assignPayload: PayLoadForAssigningProject = new PayLoadForAssigningProject();
  removePayload: PayLoadForAssigningProject = new PayLoadForAssigningProject();


  //============================================For Modal==============================================
  showModal = false; //Flag for Modal to Display
  isEditModalOpen = false;
  editProjectForm: any = new ProjectPayload();
  
  constructor(private projectManagementService: ProjectManagementService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProjects();
  }

  ngAfterViewInit() {
    if (this.selectedProject) {
      this.getUserOfProject(this.selectedProject.projectID);
    }
  }

  onSelectProject(project: any) {
    debugger;
    this.selectedProject = project;
    this.getUserOfProject(this.selectedProject.projectID)
  }

  getProjects() {
    // Call your service method to get user projects using userId
    this.projectManagementService.getAllProjects().subscribe(
      (response) => {
        this.projects = response; // Assign the fetched projects to the projects array
        console.log()
      },
      (error) => {
        console.error('Error fetching user projects:', error);
      }
    );
  }


  getUserOfProject(id: number) {
    this.projectManagementService.getUsersWithProject(id).subscribe(
      (res) => {
        this.userListOfProject = res;
        console.log(res);
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getAllUsers() {
    this.projectManagementService.getAllUsersToAssignProject().subscribe(
      (res) => {
        this.allUsers = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  //===============================================Modal=========================================
  openAssignUserModal() {
    this.showModal = true;
    this.assignPayload.projectID = this.selectedProject.projectID;
    this.getAllUsers();
  }

  closeAssignUserModal() {
    this.showModal = false;
    this.assignPayload.userID = 0;
  }

  openEditModal() {
    debugger;
    if (this.selectedProject) {
      this.isEditModalOpen = true;
      this.editProjectForm = { ...this.selectedProject };
      // this.editProjectForm.startDate = new Date(this.selectedProject.startDate);
      //   this.editProjectForm.endDate = new Date(this.selectedProject.endDate);
      this.editProjectForm.startDate = this.formatDate(this.selectedProject.startDate);
    this.editProjectForm.endDate = this.formatDate(this.selectedProject.endDate);
    }
  }
  
  formatDate(dateString: string | null): string {
    // Use the non-null assertion operator (!) to assert that dateString is not null
    const date = new Date(dateString!);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || ''; // Provide a default value when formatting fails
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }
  //==========================================Assign or Unassign================================
  assignUser(assignPayload: any) {
    debugger;
    this.projectManagementService.assignProjectToUser(assignPayload).subscribe(
      (res) => {
        debugger;
        console.log("Project Assigned Successfully");
        this.getUserOfProject(this.assignPayload.projectID);
        this.closeAssignUserModal();
      },
      (error) => {
        console.error(error)
      }
    )
  }

  removeAssignUser(userId: number, projectId: number) {
    this.removePayload.userID = userId;
    this.removePayload.projectID = projectId;

    this.projectManagementService.removeUserFromAssignedProject(this.removePayload).subscribe({
      next: (res) => {
        console.log(res)
        this.getUserOfProject(this.removePayload.projectID);
        this.getProjects()
      },
      error: () => {
        console.log("something went wrong while removing user")
      },
    });
  }
  updateProjectClick(projectPayload: any) {
    this.projectManagementService.editProject(projectPayload).subscribe({
      next: (res) => {
        console.log(res)
        debugger;
        this.updateSelectedProject(projectPayload);
        this.isEditModalOpen = false;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  updateSelectedProject(updatedProject: ProjectPayload) {
    // Assuming selectedProject is an object reference in your component.
    if (this.selectedProject) {
        // Update the selected project's properties with the edited data.
        this.selectedProject.projectName = updatedProject.projectName;
        this.selectedProject.description = updatedProject.description;
        this.selectedProject.startDate = updatedProject.startDate;
        this.selectedProject.endDate = updatedProject.endDate;
    }
}




}
