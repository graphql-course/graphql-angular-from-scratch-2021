import { MeData } from './../me/me.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { LoginData, LoginResult } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginData = {
    email: '',
    password: ''
  };
  sendData!: boolean;
  error!: boolean;
  show!: boolean;
  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data?: MeData) => {
      if (data === null || data === undefined || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   }

  ngOnInit() {
    this.auth.start();
  }

  save() {
    this.sendData = true;
    this.show = false;
    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      if (result.status) {
        this.error = false;
        localStorage.setItem('tokenJWT', result.token || '');
        console.log('login correcto');
        this.auth.updateStateSession(true);
        this.router.navigate(['/me']);
      } else {
        this.error = true;
        this.show = true;
        this.auth.updateStateSession(false);
        localStorage.removeItem('tokenJWT');
        console.log('login incorrecto');
        this.sendData = false;
      }
    });
  }

}
