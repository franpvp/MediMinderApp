import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRecPage } from './list-rec.page';

const routes: Routes = [
  {
    path: '',
    component: ListRecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRecPageRoutingModule {}
