import { Component, ViewChild , Input} from '@angular/core';
// import { NguiMapModule} from '@ngui/map';
import { NguiMapComponent} from '@ngui/map';
import { Marker } from '@ngui/map';

import { ApplicationRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {POIListComponent} from '../poi-list/poi-list.component';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent
  @ViewChild(POIListComponent) poiList: POIListComponent;
  map: google.maps.Map;
  title: string = 'My first AGM project';
  lat: number = 35.30087318661081;
  lng: number =  -120.66120503906859;
  infoWindow:google.maps.InfoWindow;
  // lat: number = 128.84;
  // lng: number =  -25.76;  
  zoom: number = 16;

  constructor(private cd: ChangeDetectorRef) {}

  // public markers: [] = [];
  // public markers:google.maps.MVCObject[] = [];
  @Input()
  public markers:POI[] = [];
  // public markers:Marker[] = [];
  mapClicked($event) {
    console.log($event);
    this.map = $event.target;
    console.log($event.latLng.lng());
    let lati = $event.latLng.lat();
    let lngi = $event.latLng.lng();
    let pos = {
      lat: lati, 
      lng: lngi
    }
    // let marker = new google.maps.Marker({position: pos, map: this.map, title: 'Placeholder'});
    
    // let id = $event.target.map.markers[this.markers.length - 1];
    let newMarker = new POI(
      lati,
      lngi,
      'Placeholder',
      null
    );
    // let marker = new Marker(this.nguiMapComponent);
    // marker.position = "loc: " + lati +"," + lngi;
    // marker.initialize();
    // marker.mapObject.setDraggable(true);
    this.markers.push(newMarker);
    console.log(Object.keys(this.map));
    // console.log(JSON.parse(JSON.stringify(this.map)));
    console.log(this.map);

    // console.log("markers", this.nguiMapComponent.markers);
    
    // this.cd.detectChanges();

  }

  onMapReady(map) {
    console.log("map", map);
    this.map = map;
  }

  onMarkerInit(marker) {
    this.markers.push(marker);
  }

  markerClicked($event, eventName, id) {
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
          // let newMarker = new POI(
          //   lati,
          //   lngi,
          //   'Placeholder',

          // );
          this.markers[id].lat = lati;
          this.markers[id].lng = lngi;

          // this.cd.detectChanges();
    }
    else {
          // console.log("position changed " + id);
          console.log($event);
          let lati = $event.position.latLng.lat();
          let lngi = $event.position.latLng.lng()
          let id = $event.target.map.markers[this.markers.length - 1];
          let newMarker = new POI(
            lati,
            lngi,
            'A',
            id
          );
          this.markers.splice(id, 1);
          this.markers.push( newMarker);
          // this.cd.detectChanges(); 
    }
  }

  highlight($event, i) {
    this.poiList.highlight(i);
    console.log($event);
  }

  markerDropped($event, eventName) {

  }
  
  mapDoubleClicked($event: MouseEvent) {
    console.log("map double clicked");
  }
  styleFunc(feature) {
    return ({
      clickable: false,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }

  hideMarkerInfo($event) {
    console.log($event);
  }

  clicked($event, id) {
    console.log(id);
    // let marker:google.maps.Marker = event.target;
    // this.infoWindow = new google.maps.InfoWindow();
    // let infoWindowOptions = 
    //  " <h3>"  + this.markers[id].label + "</h3>" +
    //  "<h4> Latitude: " +this.markers[id].lat + "</h4>" + 
    //  "<h4> Longitude: " +this.markers[id].lng + "</h4>" +
    //  "<button (click)=closeinfoWindow()>" + close + "</button>";
    
    // this.infoWindow.setContent(infoWindowOptions);

    // console.log("marker: ", marker);
    //  google.maps.event.addListener(marker, 'click', () => {
    //   // infoWindow.setContent(content);
    //   this.infoWindow.open(this.map, marker);
    // });
    // console.log($event.target);

    // this.marker.lat = marker.getPosition().lat();
    // this.marker.lng = marker.getPosition().lng();
    // let mark = {
    //   lat: this.markers[id].lat,
    //   lng: this.markers[id].lng
    // };

    // this.map. openInfoWindow('iw-' + id, marker);
    if (confirm("Would you like to remove pin at Location:\n" + "Latitude: " +this.markers[id].lat +"\nLongitude: " + this.markers[id].lng)) {
      this.markers.splice(id, 1);
    }
  }
}

class POI{
  public lat: number;
  public lng: number;
  public label: string;
  public display:boolean;
  public id: number;
  constructor(lat, lng, label, id) {
    this.lat = lat;
    this.lng = lng;
    this.label = label;
    this.display = true;
    this.id = id;
  }
}
