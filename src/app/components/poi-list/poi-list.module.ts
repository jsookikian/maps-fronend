import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import {POIListComponent} from './poi-list.component';
import {EditDialogModule} from '../edit-dialog/edit-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    EditDialogModule
  ],
  providers: [],
  // entryComponents: [EditDialogComponent],
  declarations: [ POIListComponent],
  bootstrap: [ POIListComponent ],
  exports: [POIListComponent]
})
export class POIListModule {}