import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';
declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map', { static: true }) map;

  constructor() { }

  ngOnInit() {
    const position = this.coords.split(',');
    const latitude = Number(position[0]);
    const longitude = Number(position[1]);
    mapboxgl.accessToken = environment.mapBox;

    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }

}
