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
    dialogRef: MatDialogRef<EditDialogComponent>;
    // constructor(private popup:Popup){}
   constructor(public dialog: MatDialog) {}

    editLabel($event, i): void {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      height: '200px',
      data: { label: this.markers[i].label, lat: this.markers[i].lat, lng: this.markers[i].lat }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.length > 0) {
        this.markers[i].label = result;
      }
    });
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
