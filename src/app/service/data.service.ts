import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {Appt} from '../shared/appt.model';
import {ApptService} from './appt.service';

@Injectable()
export class DataService {

  constructor(private http: Http, private apptSvc: ApptService) { }

  getUserAppts() {
  	return this.http.get('http://localhost:3000/appointments')
	  		.map((res:Response) => {
	  			const appts: Appt[] = 	res.json()

	  			return appts;
	  		})
	  		.subscribe(
	  				(response: Appt[]) => {
	  					this.apptSvc.setAppts(response);
	  					// console.log('In dataservice, appts in appt service set to this: ', this.apptSvc.setAppts(response));
	  				}
	  			)

  }

  saveUpdatedUserAppt(appt) {
    
    
    return fetch('http://localhost:3000/appointments/' + appt.id, {
        method: 'put',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(
              appt
         )
      })
  }

  saveNewUserAppt(appt) {
    
    
    return fetch('http://localhost:3000/appointments/', {
        method: 'post',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(
              appt
         )
      })
  }
 
}
