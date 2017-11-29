import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';

import {POIListComponent} from './poi-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  declarations: [ POIListComponent],
  bootstrap: [ POIListComponent ],
})
export class POIListModule {}