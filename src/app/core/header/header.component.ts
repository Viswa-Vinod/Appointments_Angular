import {Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
import {Response} from '@angular/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, AfterViewInit {
	subscription: Subscription;
	uid;

	constructor(private router:Router, private authSvc:AuthService, 
				private cdRef:ChangeDetectorRef, private dataSvc: DataService){	}
	

	ngOnInit() {
		this.subscription = this.authSvc.currentUser.subscribe( (uid) => {
				
					this.uid = uid;
					
			// console.log('uid in header constructor is: ',this.uid);
	    			if (this.uid==null || this.uid==undefined || this.uid=='' || this.uid =='undefined' 
	    				|| this.uid == '') {
	    				
	    		// console.log('header constructor: no user logged in, redirecting...');
	    				this.router.navigate([ '/not-found' ]);
	  	 			}	
		}) ;
			
		this.uid = localStorage.getItem('userID')? localStorage.getItem('userID'): '' ;
    	if (this.uid==null || this.uid==undefined) this.router.navigate([ '/not-found' ]);
	}

	ngAfterViewInit() {
		this.cdRef.detectChanges();

	}


	onSaveData() {
		// this.dataSvc.saveUserAppts();

	}

	onGetData() {

		this.dataSvc.getUserAppts();
	}

	onLogout() {
		//console.log('in Logout');
		
		this.authSvc.logout();
		this.router.navigate([ '/' ]);	
	}

	isAuthenticated() {
    return this.authSvc.isAuthenticated();
  	}

  	
}