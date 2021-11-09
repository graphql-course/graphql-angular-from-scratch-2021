import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meData } from 'src/app/@graphql/operations/query';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

import { Router } from '@angular/router';
import { MeData } from 'src/app/@pages/me/me.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessVar = new Subject<boolean | undefined>();
  public accessVar$ = this.accessVar.asObservable();
  public userVar = new Subject<MeData | undefined>();
  public userVar$ = this.userVar.asObservable();
  constructor(private apollo: Apollo, private router: Router) { }

  public updateStateSession(newValue: boolean | undefined) {
    this.accessVar.next(newValue);
  }
  public updateUser(newValue?: MeData | undefined) {
    this.userVar.next(newValue);
  }

  logout() {
    this.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    const currentRouter = this.router.url;
    if (currentRouter !== '/register' && currentRouter !== '/users') {
      this.router.navigate(['/login']);
    }
  }

  private sincroValues(result?: MeData | undefined, state?: boolean) {
    this.updateStateSession(state);
    this.updateUser(result);
  }

  start() {
    if (localStorage.getItem('tokenJWT') !== null ) {
      this.getMe().subscribe((result: MeData) => {
        if (result.status) {
          if (this.router.url === '/login') {
            this.sincroValues(result, true);
            this.router.navigate(['/me']);
          }
        }
        this.sincroValues(result, result.status);
      });
    } else { // No hay token
      this.sincroValues(undefined, false);
    }
  }
  // Obtener nuestro usuario y datos con el token
  getMe() {
    return this.apollo
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: localStorage.getItem('tokenJWT') || ''
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.me;
    }));
  }
}
