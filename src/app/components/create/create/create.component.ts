import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent} from '../../map/map.component';
import { POIListComponent} from '../../poi-list/poi-list.component';
import { NavigationEnd, Event, Router, ActivatedRoute } from '@angular/router';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild(MatSlideToggle) publicToggle: MatSlideToggle;
  titleEditable:boolean;
  router: Router;
  currentUrl: string;
  constructor (router: Router, private route: ActivatedRoute
  ) {
    this.router = router;
    this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      this.currentUrl = event.url;
    }
  });}
  

  ngOnInit() {
      this.mapComponent.createNewMap();
      this.publicToggle.checked = this.mapComponent.currentMap.is_public;

  }

  saveChanges() {
    console.log("saving changes");

    this.mapComponent.currentMap.is_public = this.publicToggle.checked;
    if (!this.mapComponent.saveChanges()) {
      
    }
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
