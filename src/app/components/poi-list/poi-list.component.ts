import { Component, Input, Inject, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
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
    
   constructor(public dialog: MatDialog, private elRef: ElementRef) {}



    editLabel($event, i): boolean {
      let changesMade: boolean = false;
    let dialogRef = this.dialog.open(EditDialogComponent, {
      height: '200px',
      data: { label: this.markers[i].label, lat: this.markers[i].lat, lng: this.markers[i].lat }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.markers.splice(i, 1);
        changesMade = true;
      }
      else if (result && result.length > 0 && result !== "true") {
        this.markers[i].label = result;
        changesMade = true;
      }
      
    });
    return changesMade;
  }

  isActive(i) {
    return this.selected === i;
  }
  highlight(i) {
    if (this.selected == i) {
      this.selected = null;
    }
    else {
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
