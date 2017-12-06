import { Component, Input, Inject, OnChanges } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { NavigationEnd, Event, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapService } from  '../../../services/map.service';
import {Map, POI} from  '../../map/map.component';
// import {EditDialog, EditDialogDialog} from '../map/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  
})
export class ToolbarComponent implements OnChanges {

  maps: Map[] = [];

  router: Router;
  currentUrl: string;
  constructor (router: Router, public mapService: MapService) {
      this.router = router;
      this.router.events.subscribe((event: Event) => {
      console.log(event);
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    let maps;
    this.mapService.getMaps().subscribe(fetchedMaps => {
        maps = fetchedMaps;
        for (let i = 0; i < maps.length; i++) {
          let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
          for (let k = 0; k < maps[i].markers.length; k++) {
            newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label));
          }
          this.maps.push(newMap);
        } 
      });
  }

  ngOnChanges() {
    let maps;
    this.mapService.getMaps().subscribe(fetchedMaps => {
        maps = fetchedMaps;
        for (let i = 0; i < maps.length; i++) {
          let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
          for (let k = 0; k < maps[i].markers.length; k++) {
            newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label));
          }
          this.maps.push(newMap);
        } 
      });
  }


}

