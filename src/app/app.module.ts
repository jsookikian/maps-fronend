import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';

import { NguiMapModule} from '@ngui/map';
import {HttpClientModule} from  '@angular/common/http';
import {EditDialogModule} from './edit-dialog/edit-dialog.module';
import {HomeComponent} from  './home/home/home.component';
import {HomeModule} from './home/home.module';
import {CreateComponent} from './create/create/create.component';
import {CreateModule} from './create/create.module';
import {ToolbarModule} from './toolbar/toolbar.module';

import { POIListComponent} from './poi-list/poi-list.component';
import { MapComponent} from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EditDialogModule,
    AppMaterialModule,
    HomeModule,
    CreateModule,
    ToolbarModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDh6ycUao464kIs4oBtr5jhRn8ui_Gy1LU'})
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
