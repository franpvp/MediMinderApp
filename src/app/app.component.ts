import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuRoutes: string[] = ['/home', '/add-rec', '/perfil', '/list-rec'];
  
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  isMenuEnabled(): boolean {
    const currentRoute = this.router.url;
    return this.menuRoutes.includes(currentRoute);
  }

}
