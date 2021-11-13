import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MeData } from './me.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  user: any;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data?: MeData) => {
      if (data !== null && data !== undefined) {
        this.user = data.user;
      }
    });
  }
  ngOnInit() {
    // Tenemos token
    this.auth.start();
  }

  logout() {
    this.auth.logout();
  }
}
