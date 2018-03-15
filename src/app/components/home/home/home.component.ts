import { Component, OnInit } from '@angular/core';
import { MapComponent} from '../../map/map.component';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private authService : AuthService) {

   }
   userSignedIn() {
     return this.authService.userSignedIn();
   }
  ngOnInit() {
  }

}
