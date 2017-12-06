import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import {SaveDialogComponent} from '../save-dialog/save-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  entryComponents: [SaveDialogComponent],
  declarations: [ SaveDialogComponent],
  bootstrap: [ SaveDialogComponent ],
})
export class SaveDialogModule {}