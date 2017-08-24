import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  Input, SimpleChanges, Output} from '@angular/core';
import {EtaService} from '../service/eta.service';

declare var google: any;



@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin;
  @Input() destination;


  constructor (private gmapsApi: GoogleMapsAPIWrapper, private etasvc: EtaService) {}
  
  ngOnChanges(changes: SimpleChanges){
      
    // console.log('in directions directive; changes are: ', changes);
    this.gmapsApi.getNativeMap().then(map => {
              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer;
              directionsDisplay.setMap(map);

              // console.log('in directions directive, then of promise' );
              if (this.origin && this.origin.length>1) {

                directionsService.route({
                        origin: this.origin,
                        destination: this.destination,
                        waypoints: [],
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'
                      }, (response, status) => {
                                  if (status === 'OK') {
                                    // directionsDisplay.setDirections(response);
                                    // console.log('evaluated duration to be ', response.routes[0].legs[0].duration.text);
                                    this.etasvc.setEta(response.routes[0].legs[0].duration.text);
                                  } else {
                                    window.alert('Directions request failed due to ' + status);
                                  }
                });
            }
    });
  }
}