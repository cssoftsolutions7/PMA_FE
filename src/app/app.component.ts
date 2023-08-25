import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PMA_Frontend';
  
  isUserLoggedIn(): boolean {
    const userData = sessionStorage.getItem('userData');
    return !!userData;
  }
}
