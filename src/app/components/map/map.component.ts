import { Component, ViewChild , Input} from '@angular/core';
import { MapService} from  '../../services/map.service';
import { NguiMapComponent} from '@ngui/map';

import { ApplicationRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { POIListComponent } from '../poi-list/poi-list.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent
  @ViewChild(POIListComponent) poiList: POIListComponent;
  title: string = 'New Map';
  lat: number = 35.30087318661081;
  lng: number =  -120.66120503906859;
  dialogRef: MatDialogRef<SaveDialogComponent>;

  maps: Map[] = []; 
  zoom: number = 16;
  markerNumber = 1;
  @Input()
  public markers:POI[] = [];
  public currentMap: Map = null;
  changesMade: boolean = false;
  newMap: boolean = true;
  constructor(public dialog: MatDialog, public mapService: MapService) {
    let maps;
    this.mapService.getMaps().subscribe(fetchedMaps => {
        maps = fetchedMaps;
        for (let i = 0; i < maps.length; i++) {
          let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
          for (let k = 0; k < maps[i].markers.length; k++) {
            newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label, maps[i].markers[k].img));
          }
          this.maps.push(newMap);
        } 
      });
      this.currentMap = new Map(0, "", this.lat, this.lng, this.zoom, this.markers);
  }


  setCurrentMap(id) {
    for (let i = 0; i < this.maps.length; i++) {
      if (this.maps[i].id == id) {
        this.currentMap = this.maps[i];
        this.markers = this.maps[i].markers;
      }
    }
    this.newMap = false;
  }

  createNewMap() {
    console.log(this.maps);
    let newMap = new Map(Math.round(Math.random() * 10 + 2), this.title, this.lat, this.lng, this.zoom, []);
    this.maps.push(newMap);
    this.currentMap = newMap;
    this.markers = this.currentMap.markers;
    this.newMap = true;
  }


  mapClicked($event) {
    console.log($event);
    console.log($event.latLng.lng());
    let lati = $event.latLng.lat();
    let lngi = $event.latLng.lng();
    let pos = {
      lat: lati, 
      lng: lngi
    }
    let newMarker = new POI(
      lati,
      lngi,
      "Label " + this.markerNumber++,
      null


    );
    this.markers.push(newMarker);
    this.changesMade = true;
  }

  onMapReady(map) {
    console.log("map", map);
    // this.map = map;
  }

  onMarkerInit(marker) {
    this.markers.push(marker);
  }

  markerDragged($event, eventName, id) {
    this.changesMade = true;
    if (eventName == 'dragstart') {
      // this.markers.splice(id, 1);
      console.log("marker " + id + " picked up");
    }
    else if (eventName == 'dragend') {
          console.log("drag end on " + id);
          console.log($event);

          console.log($event.target.internalPosition.lat() + "," + $event.target.internalPosition.lng());
          console.log($event.target.position.lat() + "," + $event.target.position.lng());
          console.log($event.latLng.lat() + "," + $event.latLng.lng());

          let lati = $event.target.internalPosition.lat();
          let lngi = $event.target.internalPosition.lng();
          let geo = new google.maps.Geocoder();

          this.markers[id].lat = lati;
          this.markers[id].lng = lngi;
    }
  }

  highlight($event, i) {
    this.poiList.highlight(i);
    console.log($event);
  }
  
  mapDoubleClicked($event: MouseEvent) {
    console.log("map double clicked");
  }

  markerClicked($event, id) {
    this.poiList.editLabel($event, id)
    this.changesMade = true;
    
  }

  saveChanges() {
    let changesMade: boolean = false;
    let dialogRef = this.dialog.open(SaveDialogComponent, {
      height: '200px',
      data: { text: "Would you like to save your changes before exiting?" }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result:  ${result}`);
      if (result === true) {
          // POST
          if (this.newMap) {
            console.log("Saving new map...");
            this.mapService.saveNewMap(this.currentMap).subscribe(map =>{ 
              changesMade = true;
            });
          }
          else {
            console.log("Updating map...");
            this.mapService.updateMap(this.currentMap).subscribe(map =>{ 
              changesMade = true;
            });
          }
      }
    });
      return changesMade;
  }
}

export class Map {
  id: number;
  title: string;
  lat: number;
  lng: number;
  zoom: number;
  markers:POI[];
  constructor(id, title, lat, lng, zoom, markers) {
    this.id = id;
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.markers = markers;
  }
}
export class POI{
  public lat: number;
  public lng: number;
  public label: string;
  public img: Blob;
  constructor(lat, lng, label, img) {
    this.lat = lat;
    this.lng = lng;
    this.label = label;
    this.img = img;
  }
}
