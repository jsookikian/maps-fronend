import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NguiMapModule} from '@ngui/map';
import { AppMaterialModule } from './../app-material/app-material.module';
import { POIListModule } from '../poi-list/poi-list.module';
import { MapComponent } from './map.component';
import { POIListComponent } from '../poi-list/poi-list.component';
import { SaveDialogModule } from '../save-dialog/save-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDh6ycUao464kIs4oBtr5jhRn8ui_Gy1LU'}),
    AppMaterialModule,
    POIListModule,
    SaveDialogModule,
  ],
  providers: [],
  
  declarations: [MapComponent],
  bootstrap: [ MapComponent ],
  exports: [MapComponent]
})
export class MapModule {}