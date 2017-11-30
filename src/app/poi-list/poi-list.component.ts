import { Component, Input, Inject } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
// import {EditDialog, EditDialogDialog} from '../map/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'poi-list',
  templateUrl: 'poi-list.component.html',
  styleUrls: ['poi-list.component.css'],
  
})
export class POIListComponent {
    @Input()
    markers:POI[] = [];
    selected: any;
    dialogRef: MatDialogRef<EditDialogComponent>;
    // constructor(private popup:Popup){}
   constructor(public dialog: MatDialog) {}

    editLabel($event, i): void {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      height: '200px',
      data: { label: this.markers[i].label, lat: this.markers[i].lat, lng: this.markers[i].lat }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result:  ${result}`);
      if (result === true) {
        this.markers.splice(i, 1);
        console.log("Marker " + i + " removed");
      }
      else if (result != "" && result !== "true") {
        
        this.markers[i].label = result;
      }

    });
  }

  isActive(i) {
    return this.selected === i;
  }
  highlight(i) {
    if (this.selected == i) {
      console.log("marker" + i + " normal ");
      
      this.selected = null;
    }
    else {
      console.log("marker" + i + " highlighted");

      this.selected = i;
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
