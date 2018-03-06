import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  loggedIn: boolean = false;
  user :any;
  constructor() {
  this.user = JSON.parse(localStorage.getItem('current-user-data'));
   }

  ngOnInit() {
  }

}
