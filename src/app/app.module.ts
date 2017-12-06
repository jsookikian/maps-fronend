import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './components/app-material/app-material.module';

import { NguiMapModule} from '@ngui/map';
import {HttpClientModule} from  '@angular/common/http';
import {HttpModule} from '@angular/http';

import {EditDialogModule} from './components/edit-dialog/edit-dialog.module';
import {HomeComponent} from  './components/home/home/home.component';
import {HomeModule} from './components/home/home.module';
import {CreateComponent} from './components/create/create/create.component';
import {CreateModule} from './components/create/create.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {EditModule} from './components/edit/edit.module';

import { POIListComponent} from './components/poi-list/poi-list.component';
import { MapComponent} from './components/map/map.component';
import { SettingsComponent } from './components/settings/settings.component';
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
    HttpModule,
    EditDialogModule,
    AppMaterialModule,
    HomeModule,
    CreateModule,
    ToolbarModule,
    EditModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDh6ycUao464kIs4oBtr5jhRn8ui_Gy1LU'})
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
