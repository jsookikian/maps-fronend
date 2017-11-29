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

    // marker.setVisible(true);
    this.markers.push(newMarker);
    // this.cd.detectChanges();

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

          var lati = $event.target.internalPosition.lat();
          var lngi = $event.target.internalPosition.lng()
          var newMarker = new POI(
            lati,
            lngi,
            'A'
          );
          this.markers.splice(id, 1);
          this.markers.push(newMarker);
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

  clicked(event, id) {
    console.log(id);
    // console.log($event.target);

    // this.marker.lat = marker.getPosition().lat();
    // this.marker.lng = marker.getPosition().lng();
    // var mark = {
    //   lat: this.markers[id].lat,
    //   lng: this.markers[id].lng
    // };

    // this.nguiMapComponent.openInfoWindow('iw', $event.target.markers[id].anchorPoint);

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
  constructor(lat, lng, label) {
    this.lat = lat;
    this.lng = lng;
    this.label = label;
    this.display = true;
  }
}
