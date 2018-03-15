import { Component, Input, Inject, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import { BrowseImageDialogComponent } from '../browse-image-dialog/browse-image-dialog.component';
import { POI } from '../map/map.component';
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
    editDialogRef: MatDialogRef<EditDialogComponent>;
    browseImageDialogRef: MatDialogRef<BrowseImageDialogComponent>;
    newMap: boolean;
   constructor(public editDialog: MatDialog, public browseImageDialog: MatDialog,private elRef: ElementRef) {}



    editLabel($event, i): boolean {
      let changesMade: boolean = false;
    let editDialogRef = this.editDialog.open(EditDialogComponent, {
      height: '200px',
      data: { label: this.markers[i].label, lat: this.markers[i].lat, lng: this.markers[i].lat }
    });

    editDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.newMap) {
        this.markers.splice(i, 1);
        }
        else {
          this.markers[i]._destroy = "1";
        }
        changesMade = true;
      }
      else if (result && result.length > 0 && result !== "true") {
        this.markers[i].label = result;
        changesMade = true;
      }
      
    });
      return changesMade;
    }

    browseImage($event, i): boolean {
      let changesMade: boolean = false;
    let browseImageDialogRef = this.browseImageDialog.open(BrowseImageDialogComponent, {
      
      data: {imgUrl: this.markers[i].img, ndx: i}
    });

    browseImageDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        let formdata: FormData = new FormData();
        let fileReader = new FileReader();
        formdata.append(result[0].name, result[0]);
        this.markers[i].img = result[1];
        changesMade = true;
      }
      else  {
        changesMade = false;
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

// class POI{
//   public lat: number;
//   public lng: number;
//   public label: string;
//   public display:boolean;
//   constructor(lat, lng, label) {
//     this.lat = lat;
//     this.lng = lng;
//     this.label = label;
//     this.display = true;
//   }
// }
