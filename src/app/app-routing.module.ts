import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {HomeComponent} from './home/home/home.component';
// import {CreateComponent} from './create/create.component';

const routes: Routes = [
  {
    path: '', loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '', loadChildren: './create/create.module#CreateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
