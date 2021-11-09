import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  access!: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.accessVar$.subscribe((data: boolean | undefined) => {
      console.log('session state', data);

      if ( data === false && this.access) {
        this.access = false;
        this.logout();
      } else {
        this.access = (data === undefined) ? false : data;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.start();
  }

}

