import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { NguiMapModule} from '@ngui/map';
import { MapModule} from '../map/map.module';

import { POIListModule} from '../poi-list/poi-list.module';
import { POIListComponent} from '../poi-list/poi-list.component';
import { MapComponent} from '../map/map.component';
import { EditDialogModule} from '../edit-dialog/edit-dialog.module';
import {ToolbarModule} from '../toolbar/toolbar.module';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    NguiMapModule,
    EditDialogModule,
    MapModule,
    ToolbarModule,
    // NguiInfiniteListModule,
    POIListModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
