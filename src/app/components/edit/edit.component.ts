import { Component, OnInit, OnChanges, ViewChild, Injectable } from '@angular/core';
import { MapComponent} from '../map/map.component';
import { POIListComponent} from '../poi-list/poi-list.component';
import { CanDeactivate, NavigationEnd, NavigationStart, Event, Router, ActivatedRoute, Params, NavigationCancel } from '@angular/router';
import { UnsavedChangesGuard } from '../unsaved-changes-guard/unsaved-changes-guard.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit, OnChanges {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild(MatSlideToggle) publicToggle: MatSlideToggle;

  titleEditable:boolean;
  firstTime:boolean = true;
  currentId: string;
  currentUrl: string = null;
  constructor (private router: Router, private route: ActivatedRoute
  ) {
      this.router = router;
      this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let saved:boolean;
        let done = false;
        // if (!this.firstTime && this.mapComponent.changesMade) {
        //   saved = this.saveChanges();
        //   done = true;
        // }
        // else {
        //   this.firstTime = false;
        //   saved = true;
        // }
        // if (saved && done) {
        this.currentUrl = event.url;
        this.route.params.subscribe((params:Params) =>{
            this.currentId = params.id;
            console.log("current id: " + this.currentId);
            setTimeout(() => {
              this.mapComponent.setCurrentMap(this.currentId);
              this.publicToggle.checked = this.mapComponent.currentMap.is_public;
            }, 100);
          })  ;
        // }
      }
      if (event instanceof NavigationStart) {
        
          this.currentUrl = event.url;
          this.publicToggle.checked = this.mapComponent.currentMap.is_public;

      }

    });
    // this.route.params.subscribe((params:Params) =>{
    //   this.currentId = params.id;
    //   console.log("current id: " + this.currentId);
    // });



  }


  togglePublic($event) {
    console.log("toggle", $event);
  }

  ngOnInit() {
    console.log("Edit Map Initialized");
    setTimeout(() => {
        this.mapComponent.setCurrentMap(this.currentId);
        this.publicToggle.checked = this.mapComponent.currentMap.is_public;
    }, 100);
  }

  ngOnChanges() {
    
    console.log("Changed");
    setTimeout(() => {
        this.mapComponent.setCurrentMap(this.currentId);
        this.publicToggle.checked = this.mapComponent.currentMap.is_public;

    }, 100);
  }

  saveChanges() {
    // if (!this.mapComponent.saveChanges()) {

    // }
    this.mapComponent.currentMap.is_public = this.publicToggle.checked;
    return this.mapComponent.saveChanges();
  }

  editTitle() {
    this.titleEditable = true;
  }

  changeTitle(mapTitle) {
    if (mapTitle.length > 0 && mapTitle !== "") {
      this.mapComponent.currentMap.title = mapTitle;
    }
    this.titleEditable = false;

  }

}
