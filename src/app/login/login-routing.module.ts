import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { RegistroPage } from '../registro/registro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'registro',
    component: RegistroPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
