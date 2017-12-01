import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AppMaterialModule } from './../app-material/app-material.module';

import { EditDialogModule} from '../edit-dialog/edit-dialog.module';
import {ToolbarModule} from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    // SettingsRoutingModule,
    AppMaterialModule,
    ToolbarModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }