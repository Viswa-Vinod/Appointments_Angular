import {Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ApptService} from '../../service/appt.service';
import {EtaService} from '../../service/eta.service';
import {DataService} from '../../service/data.service';
import {Subscription}  from 'Rxjs/Subscription';
import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';

declare var google: any;

@Component({ 
  selector: 'app-appt',
  templateUrl: './appt.component.html',
  styleUrls: ['./appt.component.css']
})

export class ApptComponent implements OnInit {
  
  subscription: Subscription;
	apptID;
  userID;
	appt;
  apptForm: FormGroup;
  origin: string = "" ; // encodeURI("Suncity Gloria, Bangalore");
  destination: string = "" ; //= encodeURI("Brigade Millenium, Bangalore");
  userETA;
  reqStatus = {};
  accStatus = {};

  constructor(private route: ActivatedRoute, private router:Router, private apptSvc: ApptService, 
              private fb: FormBuilder, private etaSvc: EtaService, private gmapsApi: GoogleMapsAPIWrapper,
              private dataSvc: DataService) {}

  ngOnInit() {

  	 this.route.params.subscribe((params: Params) => {
        this.apptID = params['apptID'];    
        this.userID = params['id'];
        this.appt = this.apptSvc.getAppt(this.apptID);
          // console.log('appt is: ', this.appt);
        if (!this.appt) this.router.navigate([ '/not-found' ]);
        this.initForm();  
    
     })

     this.subscription = this.etaSvc.eta.subscribe( (eta) => {
            // console.log('new eta val in appt component ngOninit ', eta);
          this.userETA = eta;
          
          if (this.userID == this.apptForm.value.RequestorID) {
              this.reqStatus = {'ETA': this.userETA, "Position": this.origin? this.origin: ""}  
              
              this.apptForm.value.RequestorStatus = this.userETA;  
          
          } else {
             this.accStatus = {'ETA': this.userETA, "Position": this.origin? this.origin: ""}  
             this.apptForm.value.AcceptorStatus = this.userETA; 
          }
       
     });
   }

  private initForm() {
          this.apptForm = this.fb.group({
            apptID: [{value:this.appt.id, disabled:true}],
            date: [{value: this.appt.date, disabled: true}],
            StartTime: [{value: this.appt.StartTime, disabled: true}],
            EndTime: [{value: this.appt.EndTime, disabled: true}],
            RequestorID: [{value: this.appt.RequestorID, disabled: true}],
            AcceptorID: [{value: this.appt.AcceptorID, disabled:true}],
            Venue: [{value: this.appt.Venue, disabled:true}],
            RequestorStatus: [{value: this.appt.RequestorStatus.ETA? this.appt.RequestorStatus.ETA: 'Not Available', disabled: true}],
            AcceptorStatus: [{value: this.appt.AcceptorStatus.ETA? this.appt.AcceptorStatus.ETA: 'Not Available', disabled: true}],
            RequestorReminder: [this.appt.RequestorReminder],
            AcceptorReminder: [this.appt.AcceptorReminder]
        })

       
  }

  onEdit() {
    
    this.apptForm.enable();
    this.apptForm.get('apptID').disable();
    this.apptForm.get('RequestorStatus').disable();
    this.apptForm.get('AcceptorStatus').disable();

  }

  onSubmit() {
    this.apptForm.disable();
    //console.log(this.apptForm.value);
    // this.apptSvc.updateAppt(this.apptForm.value.id-1, this.apptForm.value);

    let startTime = this.apptForm.value.StartTime;
    let endTime = this.apptForm.value.EndTime;
    let apptDate = this.appt.Date;
    
    let re = /\d{4}/ ; 
   
    
    startTime = re.test(startTime) ? startTime: apptDate + ' ' + startTime;
    endTime = re.test(endTime) ? endTime: apptDate + ' ' + endTime;

    let updatedAppt = {
                      id: +this.apptID, 
                      Purpose: this.appt.Purpose,
                      date: this.appt.date,
                      StartTime: startTime,
                      EndTime: endTime,
                      RequestorID: this.apptForm.value.RequestorID,
                      AcceptorID: this.apptForm.value.AcceptorID,
                      Venue: this.apptForm.value.Venue,
                      RequestorStatus: this.reqStatus,
                      AcceptorStatus: this.accStatus,
                      Status: 'UnConfirmed',
                      RequestorReminder: this.apptForm.get("RequestorReminder").value,
                      AcceptorReminder: this.apptForm.get("AcceptorReminder").value
                    }
     // console.log('updated appt in appt Component is: ', updatedAppt);
     this.apptSvc.updateAppt(this.apptID-1, updatedAppt);
       this.dataSvc.saveUpdatedUserAppt(updatedAppt)
       .then(response => {
          this.router.navigate(['user', this.userID]); 
       })
  }

  onLeaving() {
    // console.log('leaving now');
    this.getLocation();

  }



 private   showPosition = (position) => {
        let lat = position.coords.latitude ;
        let lng = position.coords.longitude; 
        let latlng = new google.maps.LatLng(lat, lng);
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({'location': latlng}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                 // console.log(this.apptForm);
                 this.origin = results[1].formatted_address.split(',')[0] +  ',' + 
                      results[1].formatted_address.split(',')[1] ;

                 this.destination = this.apptForm.controls.Venue.value;
                 

             } else {
              alert("Geocoder failed due to: " + status);
            }
           
      })
    }
    
  private  getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    

}
