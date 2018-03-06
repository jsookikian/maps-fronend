import { Component, Input, Inject, OnChanges, ViewChild } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { NavigationEnd, Event, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapService } from  '../../../services/map.service';
import {Map, POI} from  '../../map/map.component';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { LoginDialogComponent} from '../../login-dialog/login-dialog.component';
import { RegisterDialogComponent} from '../../register-dialog/register-dialog.component';
import { Angular2TokenService } from 'angular2-token/angular2-token';
import { AuthService } from '../../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
// import {EditDialog, EditDialogDialog} from '../map/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  
})
export class ToolbarComponent implements OnChanges {
  loggedIn: boolean = false;
  maps: Map[] = [];
  loginDialogRef: MatDialogRef<LoginDialogComponent>;
  registerDialogRef: MatDialogRef<RegisterDialogComponent>;

  router: Router;
  currentUrl: string;
  constructor (router: Router, 
               public mapService: MapService, 
               public loginDialog: MatDialog, 
               public registerDialog: MatDialog,
               public authService: AuthService
              ) {
      this.router = router;
      this.router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    // let maps;
    // this.mapService.getMaps().subscribe(fetchedMaps => {
    //   maps = fetchedMaps;
    //   for (let i = 0; i < maps.length; i++) {
    //     let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
    //     for (let k = 0; k < maps[i].markers.length; k++) {
    //       newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label, maps[i].markers[k].img));
    //     }
    //     this.maps.push(newMap);
    //   } 
    // });
        this.parseMaps();
  }


  parseMaps() {
    if (this.authService.userSignedIn()) {
    let maps;
    this.mapService.getMaps().subscribe(fetchedMaps => {
      if (fetchedMaps) {
        maps = fetchedMaps;
        for (let i = 0; i < maps.length; i++) {
          let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
          for (let k = 0; k < maps[i].markers.length; k++) {
            newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label, maps[i].markers[k].img));
          }
          this.maps.push(newMap);
        } 
    }
    });
  }
  }
  userLoggedIn() {
    // console.log("User Signed in value", this.authService.userLoggedIn);
    return this.authService.userSignedIn();
  }
  
  logout() {
    console.log("Logging out..");
    this.authService.logoutUser().subscribe(
      res => {
        console.log("Logged out", res)
        this.router.navigate(['/'])
        
      }

    );
    // .subscribe(res => console.log("delete!", res));
  }

  ngOnChanges() {
    let maps;
    this.mapService.getMaps().subscribe(fetchedMaps => {
        maps = fetchedMaps;
        for (let i = 0; i < maps.length; i++) {
          let newMap = new Map(maps[i].id, maps[i].title, maps[i].lat, maps[i].lng, maps[i].zoom, []);
          for (let k = 0; k < maps[i].markers.length; k++) {
            newMap.markers.push(new POI(maps[i].markers[k].lat, maps[i].markers[k].lng, maps[i].markers[k].label, maps[i].markers[k].img));
          }
          this.maps.push(newMap);
        } 
      });
  }

  // logout() {
  //   this.authService.logOutUser();
    
  // }

  login($event): boolean {
    let changesMade: boolean = false;
  let loginDialogRef = this.loginDialog.open(LoginDialogComponent, {
    width: '250px',
    height: '300px',
    data: {x:5}
  });


  loginDialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      //here is where we auth
      let user = {
        email: result[0],
        password: result[1],
      };
      this.authService.logInUser(user).subscribe(

        (res) => {
            if (res.status == 200) {
              this.parseMaps();

            }
                    
         },


    )
      this.loggedIn = true;

      this.router.navigate(['/'])
      changesMade  = true;
    }
    else  {
      changesMade = false;
    }
   
  });
    return changesMade;
  } 

  register($event): boolean {
    let changesMade: boolean = false;
  let registerDialogRef = this.registerDialog.open(RegisterDialogComponent, {
    width: '300px',
    height: '475px',
    data: {x:5}
  });

  registerDialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      this.router.navigate(['/'])
      let user = {
        email: result[0],
        password: result[1],
        // passwordConfirmation: result[2]
      };
      //here is where we auth
      this.authService.registerUser(user).subscribe(

        (res) => {
            if (res.status == 200) {
              this.parseMaps();

            }
                    
         },


    )
      changesMade  = true;
      }
    else  {
      changesMade = false;
    }
   
  });
    return changesMade;
  } 

}

