import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecPage } from './add-rec.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecPageRoutingModule {}
