import { UsersModule } from './@pages/users/users.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: `login`, loadChildren: () =>
      import('./@pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: `me`, loadChildren: () =>
      import('./@pages/me/me.module').then(m => m.MeModule)
  },
  {
    path: `users`, loadChildren: () =>
      import('./@pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: `register`, loadChildren: () =>
      import('./@pages/register/register.module').then(m => m.RegisterModule)
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
