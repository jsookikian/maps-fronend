import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditComponent} from './components/edit/edit.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'create/',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings', 
    component : SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', 
    component: EditComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
