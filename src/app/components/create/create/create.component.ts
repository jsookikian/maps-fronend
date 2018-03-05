import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent} from '../../map/map.component';
import { POIListComponent} from '../../poi-list/poi-list.component';
import { NavigationEnd, Event, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  titleEditable:boolean;
  router: Router;
  currentUrl: string;
  constructor (router: Router, private route: ActivatedRoute
  ) {
    this.router = router;
    this.router.events.subscribe((event: Event) => {
    console.log(event);
    if (event instanceof NavigationEnd) {
      this.currentUrl = event.url;
    }
  });}
  

  ngOnInit() {
      this.mapComponent.createNewMap();
  }

  saveChanges() {
    console.log("saving changes");
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
