import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApptService } from '../../../service/appt.service';
import { DataService } from '../../../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-appt',
  templateUrl: './new-appt.component.html',
  styleUrls: ['./new-appt.component.css']
})
export class NewApptComponent implements OnInit {
	userID;
	apptForm: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
            private apptSvc: ApptService, private dataSvc: DataService,
            private router: Router) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    if (this.apptSvc.getAppts().length==0) this.router.navigate([ '/not-found' ]);    
    this.initForm();
  	
  }

    private initForm() {
              this.apptForm = this.fb.group({
                apptPurpose: [''],
                date: [''],
                StartTime: [''],
                EndTime: [''],
                RequestorID: [this.userID],
                AcceptorID: [''],
                Location: [''],
                RequestorReminder: [''],
                AcceptorReminder: [''],
                Venue: ['']
               
            })

        this.apptForm.enable();
        this.apptForm.get('RequestorID').disable();
    }
    
    onSubmit() {
      let appts = this.apptSvc.getAppts();
      // console.log('appts is: ', appts);
      let idLastAppt = appts.length;
      // console.log('len of appt is: ', appts.length)
      let newAppt = {
                      id: +idLastAppt + 1, 
                      Purpose: this.apptForm.value.apptPurpose,
                      date: this.apptForm.get("date").value,
                      StartTime: new Date(this.apptForm.get("date").value + " " + this.apptForm.value.StartTime),
                      EndTime: new Date(this.apptForm.get("date").value + " " + this.apptForm.value.EndTime),
                      RequestorID: this.userID,
                      AcceptorID: this.apptForm.value.AcceptorID,
                      Venue: this.apptForm.value.Venue,
                      RequestorStatus: {},
                      AcceptorStatus: {},
                      Status: 'UnConfirmed',
                      RequestorReminder: this.apptForm.get("RequestorReminder").value==""?false:true,
                      AcceptorReminder: false
                    }
       // console.log('new appt is: ', newAppt);
       this.apptSvc.addAppt(newAppt) ;

        this.dataSvc.saveNewUserAppt(newAppt)
       .then(response => {
          this.router.navigate(['user', this.userID]); 
       })
    }

}
