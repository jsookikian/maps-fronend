import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create/create.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { NguiMapModule} from '@ngui/map';
import { MapModule} from '../map/map.module';
import { MapComponent} from '../map/map.component';
import { POIListModule} from '../poi-list/poi-list.module';
import { EditDialogModule} from '../edit-dialog/edit-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    AppMaterialModule,
    NguiMapModule,
    EditDialogModule,
    MapModule,
    POIListModule
  ],
  declarations: [CreateComponent]
})
export class CreateModule { }
