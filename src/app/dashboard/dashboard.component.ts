import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service'; // Import your service


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: any[] = []; // Replace 'any[]' with your actual project type
  userId: number = 0;

  constructor(
    private dashboardService: DashboardService, // Inject your servic
  ) {}

  ngOnInit() {
    // Retrieve the user's ID from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.userId = JSON.parse(userData).userID; // Assuming userData is a JSON string
      // Call the service to get user projects
      this.getUserProjects(this.userId);
    }
  }

  getUserProjects(userId: number) {
    // Call your service method to get user projects using userId
    this.dashboardService.getAllProjectOfUser(userId).subscribe(
      (response) => {
        this.projects = response; // Assign the fetched projects to the projects array
        console.log(response)
      },
      (error) => {
        console.error('Error fetching user projects:', error);
      }
    );
  }
}