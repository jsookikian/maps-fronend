import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { BrowseImageDialogComponent } from './browse-image-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  entryComponents: [BrowseImageDialogComponent],
  declarations: [BrowseImageDialogComponent],
  bootstrap: [ BrowseImageDialogComponent ],
})

export class BrowseImageDialogModule {}