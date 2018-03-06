import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Map, POI } from '../components/map/map.component';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RequestOptions } from '@angular/http/src/base_request_options';


@Injectable()
export class MapService {

    constructor(public http:HttpClient, private authService: AuthService) {
        authService.userSignedIn();
    }
    
    getMaps() {
        if (this.authService.userSignedIn()) {
            let saved = JSON.parse(localStorage.getItem('current-user-headers'));
            let user = JSON.parse(localStorage.getItem('current-user-data'));
            console.log("User Obj", user);
            let headers = new HttpHeaders();
            headers = headers.append("access-token", saved['access-token']);

            headers = headers.append("client", saved['client']);

            headers = headers.append("expiry", saved['expiry']);
            headers = headers.append("token-type", saved['token-type']);
            headers = headers.append("uid", saved['uid']);

            console.log("headers obj", headers);
            console.log("Getting maps...")
            return this.http
                .get('http://localhost:3000/users/' + user['id'] + '/maps',{ headers: headers})
                .map(res => res);
        // return this.http.get('https://infinite-temple-70788.herokuapp.com/users/1/maps?token=zxsF81gRMCF6SgEJ9C3C')
        //     .map(res => res.json());
        }
        else {
            return null;
        }
    }

    updateMap(map) {
        let headers = new Headers();
        let savedHeaders = JSON.parse(localStorage.getItem('current-user-headers'));
        console.log("updating map...", map);
        return this.http.patch('http://localhost:3000/users/1/maps', map)
            .map(res => res);
        
        // return this.http.patch('https://infinite-temple-70788.herokuapp.com/users/1/maps?token=zxsF81gRMCF6SgEJ9C3C', map)
        //     .map(res => res.json());
    }

    saveNewMap(map) {

        if (this.authService.userSignedIn()) {
            let saved = JSON.parse(localStorage.getItem('current-user-headers'));
            let headers = new HttpHeaders();
            headers = headers.append("access-token", saved['access-token']);
            headers = headers.append("client", saved['client']);
            headers = headers.append("expiry", saved['expiry']);
            headers = headers.append("token-type", saved['token-type']);
            headers = headers.append("uid", saved['uid']);
                
            // headers = headers.append("Content-Type", undefined);

            let user = JSON.parse(localStorage.getItem('current-user-data'));
            console.log("User Obj", user);
            console.log("Saving map:",map);
            const formData = new FormData();

            Object.keys(map).forEach(key => {
                formData.append(key, map[key]);
              });

              let options: Object = {
                headers: headers,
            };

            return this.http.post(
                
                'http://localhost:3000/users/' + user['id'] + '/maps',map,
                options)
        .map(res => res);
        // return this.http.post('https://infinite-temple-70788.herokuapp.com/users/1/maps?token=zxsF81gRMCF6SgEJ9C3C', map)
        //     .map(res => res.json());   
        }
    }

}