import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { CreateComponent } from './components/create/create/create.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditComponent} from './components/edit/edit.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'create/', component: CreateComponent,
  },
  {
    path: 'settings', component : SettingsComponent
  },
  {
    path: 'edit/:id', component: EditComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
