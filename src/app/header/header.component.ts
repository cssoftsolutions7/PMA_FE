import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userName:string = '';
  constructor(private router: Router){}
  ngOnInit() {
    // Retrieve the user's data from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      // Assign the userName from userData to the userName variable
      this.userName = user.userName; // Adjust the property name if needed
    }
  }
  isUserLoggedIn(): boolean {
    const userData = sessionStorage.getItem('userData');
    return !!userData;
  }
  logout(): void {
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
