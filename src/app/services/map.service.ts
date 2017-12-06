import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Map, POI } from '../components/map/map.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MapService {

    constructor(public http:Http) {

    }

    getMaps() {
        // return this.http.get('http://localhost:3000/maps')
        //     .map(res => res.json());
        return this.http.get('http://localhost:3000/users/1/maps')
            .map(res => res.json());
    }

    updateMap(map) {
        console.log("updating map...", map);
        // return this.http.patch('http://localhost:3000/maps/' + map.id, map)
        //     .map(res => res.json());
        return this.http.patch('http://localhost:3000/users/1/maps', map)
            .map(res => res.json());
    }

    saveNewMap(map) {
        console.log("saving new map...", map);
        // return this.http.post('http://localhost:3000/maps/', map)
        //     .map(res => res.json());
        return this.http.post('http://localhost:3000/users/1/maps', map)
            .map(res => res.json());            
    }

}