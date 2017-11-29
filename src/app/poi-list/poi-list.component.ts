import { Component, Input } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import {OptimizedListComponent} from '../optimized-list/optimized-list.component';

@Component({
  selector: 'poi-list',
  templateUrl: 'poi-list.component.html',
  styleUrls: ['poi-list.component.css'],
  
})
export class POIListComponent {
    @Input()
    markers:POI[] = [];
 
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