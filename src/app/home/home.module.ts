import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { NguiMapModule} from '@ngui/map';
import { MapModule} from '../map/map.module';
import { MapComponent} from '../map/map.component';
import { POIListComponent} from '../poi-list/poi-list.component';
//  import { NguiInfiniteListModule } from '@ngui/infinite-list';
import {OptimizedListModule} from '../optimized-list/optimized-list.module';
// import { POIListModule} from '../poi-list/poi-list.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    NguiMapModule,
    OptimizedListModule,
    // NguiInfiniteListModule,
    // POIListModule
  ],
  declarations: [HomeComponent,MapComponent, POIListComponent ]
})
export class HomeModule { }
