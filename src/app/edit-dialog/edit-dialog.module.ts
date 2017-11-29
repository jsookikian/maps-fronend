import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  entryComponents: [EditDialogComponent],
  declarations: [ EditDialogComponent],
  bootstrap: [ EditDialogComponent ],
})
export class EditDialogModule {}