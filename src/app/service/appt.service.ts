import {Appt} from '../shared/appt.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';



@Injectable()
export class ApptService {

	apptChanged = new Subject<Appt[]>();
	
	
	private appts:Appt[] = [];


	setAppts(appts:Appt[]){

		this.appts	=	appts;
		this.apptChanged.next(this.appts.slice());
	}

	getAppts() {
		// console.log('appts in appt-service is: ', this.appts.slice());
		return this.appts.slice(); 
	}

	getAppt(id) {

		return this.appts[id-1];
	}

	addAppt(newAppt:Appt) {

		
		this.appts.push(newAppt);
		// console.log('new appts array after adding new appt is: ', this.appts);
		this.apptChanged.next(this.appts.slice());


	}

	updateAppt(index:number, updatedAppt:Appt) {

		this.appts[index] = updatedAppt;
		// console.log('updated Appts in apptsvc is: ', this.appts);
		this.apptChanged.next(this.appts.slice());

       
	}

	deleteAppt(index:number) {

		this.appts.splice(index,1);
		this.apptChanged.next(this.appts.slice());
	}
}