import { Component, OnInit, ViewChild } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

import {DataService} from '../../service/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';
import {ApptService} from '../../service/appt.service';
import {AuthService} from '../../service/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
 @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  userID;
  UserAppts = [];
  eventList = [];
  calendarOptions;
  gotEvents = false;
 
  options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    pauseOnHover:true
  }

  constructor(private ds: DataService, private route: ActivatedRoute, 
              private router:Router, private apptsvc: ApptService, private authsvc: AuthService,
              private notSvc: NotificationsService) { 
      
  }  
 

   ngOnInit() {
    
       this.ds.getUserAppts();
       this.userID = this.route.snapshot.params['id'];
           
  	   this.apptsvc.apptChanged.subscribe(appts => {

         this.UserAppts = appts.filter(appt => {
        
              return appt.RequestorID == this.userID || appt.AcceptorID == this.userID
        });
         
         this.UserAppts.forEach(appt => {
            this.eventList.push({
               id: appt.id,
               title: appt.Purpose, 
               start: appt.StartTime, 
               end: appt.EndTime,
               color: (appt.Status==='Confirmed')? '#3B7A57': '#0048BA',
               allDay: false
            }) 

             if(appt.date==this.getCurrentDate()) {
              this.notSvc.success(appt.Purpose, "starts at:" + this.convertToLocalTime(appt.StartTime) + ' and ends at ' + this.convertToLocalTime(appt.EndTime));
            }

       }); //end of this.UserAppts.forEach

       

               this.calendarOptions = {            
                    fixedWeekCount : false,        
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    timezone: 'local',
                    height: 'auto',
                    events:  this.eventList,
                    eventClick: (event, jsEvent, view) => {
                                                            
                      this.router.navigate(['user', this.userID, event.id ]);

                    }//end of eventClick
                    
                    
               };//end of calendar options
               this.gotEvents = true;



   
     });
               
              
       
  }//end of ngOnInit
 
 private getCurrentDate() {
     let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; //January is 0!
            let yyyy = today.getFullYear();
            let dd_str=String(dd);
            let mm_str = String(mm);

            if(dd<10){
              dd_str = '0'+ dd;

            } 
            if(mm<10){
              mm_str ='0'+mm;
              // console.log(mm_str);
            } 
             return  yyyy + "-" + mm_str + "-" + dd_str;
 }

 private convertToLocalTime(utcTime_str) {
   
   return new Date(utcTime_str).toLocaleString()
   
 }

  onCreate() {
    // console.log('new appt clicked');
    this.router.navigate(['user', this.userID, 'new']);
  }
}//end of class dashboard component
