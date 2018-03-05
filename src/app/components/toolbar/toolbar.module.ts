import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { ToolbarComponent} from './toolbar/toolbar.component';
import { ToolbarRoutingModule} from './toolbar-routing.module';
import { MapService } from  '../../services/map.service';
import { RegisterDialogModule } from '../register-dialog/register-dialog.module';
import { LoginDialogModule } from '../login-dialog/login-dialog.module';
import { AuthService } from '../../services/auth.service';
import { Angular2TokenService } from 'angular2-token/angular2-token';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ToolbarRoutingModule,
    RegisterDialogModule,
    LoginDialogModule
  ],
  providers: [ MapService, Angular2TokenService],
  declarations: [ ToolbarComponent],
  bootstrap: [ToolbarComponent ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}