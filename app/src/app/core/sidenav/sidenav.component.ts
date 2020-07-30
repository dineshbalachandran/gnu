import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './sidenav.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isAuthenticated: Observable<boolean>;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService, private authService: AuthService) {

   }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.sidenavService.setSidenav(this.sidenav);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
