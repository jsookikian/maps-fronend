import { Component, Input, Inject } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { NavigationEnd, Event } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {EditDialog, EditDialogDialog} from '../map/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  
})
export class ToolbarComponent {
  router: Router;
  currentUrl: string;
  constructor (router: Router) {
    this.router = router;
    this.router.events.subscribe((event: Event) => {
    console.log(event);
    if (event instanceof NavigationEnd) {
      this.currentUrl = event.url;
    }
  });}


}

