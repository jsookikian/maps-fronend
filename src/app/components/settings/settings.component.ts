import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  loggedIn: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}