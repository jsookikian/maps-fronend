import { Component, ViewChild , Input} from '@angular/core';
// import { NguiMapModule} from '@ngui/map';
import { NguiMapComponent} from '@ngui/map';
import { ApplicationRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent
  title: string = 'My first AGM project';
  lat: number = 35.30087318661081;
  lng: number =  -120.66120503906859;
  // lat: number = 128.84;
  // lng: number =  -25.76;  
  zoom: number = 16;

  constructor(private cd: ChangeDetectorRef) {}

  // public markers: [] = [];
  // public markers:google.maps.MVCObject[] = [];
  @Input()
  public markers:POI[] = [];
  mapClicked($event) {
    console.log($event);
  
    console.log($event.latLng.lng());
    var lati = $event.latLng.lat();
    var lngi = $event.latLng.lng()
    var newMarker = new POI(
      lati,
      lngi,
      'A'
    );

    // let marker = new google.maps.Marker({
    //     position: $event.locLatLng,
    //     map: this.nguiMapComponent.map,
    // });

    // marker.setVisible(true);
    this.markers.push(newMarker);
    // this.cd.detectChanges();
    // let infoWindow = new google.maps.InfoWindow({
    //   content: 'A',
    //   position: $event.locLatLng
    // });

    // google.maps.event.addListener(newMarker, 'click', () => {
    //   infoWindow.open(this.nguiMapComponent.map, newMarker);
    // });
    // var m = document.getElementById('0');

    // console.log(this.markers);
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
          var lati = $event.latLng.lat();
          var lngi = $event.latLng.lng()
          var newMarker = new POI(
            lati,
            lngi,
            'A'
          );
          this.markers.splice(id, 1);
          this.markers.push( newMarker);
          // this.cd.detectChanges();
    }
    else {
          console.log("position changed " + id);
          console.log($event);
          var lati = $event.position.latLng.lat();
          var lngi = $event.position.latLng.lng()
          var newMarker = new POI(
            lati,
            lngi,
            'A'
          );
          this.markers.splice(id, 1);
          this.markers.push( newMarker);
          // this.cd.detectChanges(); 
    }
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

  clicked(id) {
    console.log(id);
    // this.marker.lat = marker.getPosition().lat();
    // this.marker.lng = marker.getPosition().lng();
    var mark = {
      lat: this.markers[id].lat,
      lng: this.markers[id].lng
    };
    if (confirm("Would you like to remove pin at Location:\n" + "Latitude: " +mark.lat +"\nLongitude: " + mark.lng)) {
      this.markers.splice(id, 1);
    }
  }
}

class POI{
  public lat: number;
  public lng: number;
  public label: string;

  constructor(lat, lng, label) {
    this.lat = lat;
    this.lng = lng;
    this.label = label;
  }
}
