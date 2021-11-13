import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login } from '../../@graphql/operations/query';
import { map } from 'rxjs/operators';
import { registerData } from '../../@graphql/operations/mutation';
import { RegisterData } from 'src/app/@pages/register/register.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  // Lista de usuarios
  getUsers() {
    return this.apollo
    .watchQuery(
      {
        query: getUsers,
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }

  // Login
  login(email: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.login;
    }));
  }

  register(user: RegisterData) {
    return this.apollo
      .mutate({
        mutation: registerData,
        variables: {
          user
        }
      }).pipe(map((result: any) => {
        return result.data.register;
      }));
  }
}
