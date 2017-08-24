import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

	currentUser = new Subject<String>();

  constructor(private http: Http, private router:Router) { }

  

	isAuthenticated() {
		if (localStorage.getItem('isLoggedIn')=="true") {
			this.currentUser.next(localStorage.getItem('userID'));
			return true	;
		} else return false;
	}

  private getUsers() {
    return 	this.http.get('http://localhost:3000/users')
	  		.map((res:Response) => res.json())
  }

  private doesUserExist(users, email) {
  	return users.filter((user) => {return user.email==email}).length > 0
  }

  private getUser(email) {
  	 let user = {};
  	 this.getUsers()
  	 	.subscribe((users:any[]) => {
  	 		user = users.filter((user) => {
  	 			return user.email==email ;
  	 		}); 

  	 	})



  } 

  private addUser (data) {
  	  		return fetch('http://localhost:3000/users', {
			  method: 'post',
			  headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json'
					  },
			  body: JSON.stringify({
							data
			   })
			})
			.then((response) => {
				return response.json()
			 })
  }

  signupUser(email:string, password:string) {

  		this.getUsers()
  			.subscribe((res:any[]) => {
	  			if (!this.doesUserExist(res, email)) {
	  				// console.log('attempting to add user' );
			  		this.addUser({"email": email, "password": password})
					.then((json) => {
							let id = json['id'];
							localStorage.setItem('isLoggedIn', 'true');
				
							localStorage.setItem('userID', id);
							this.currentUser.next(id);
					       
					       // console.log('redirecting to: ', '/user' + '/'+ id);
					      this.router.navigate([ '/user',id]);	    
					    })
					.catch(function(ex) {
					    console.log('parsing failed: ', ex)
					    });
  				}
	  			
				else console.log('user already exists');
			// let header = new Headers({'Content-Type': 'application/json'});
	  // 		let options = new RequestOptions({ headers: header });
	  // 		return this.http.post("http://localhost:3000/users",{"email":email, "password":password}),
	  // 			options);
	  		// .map((res:Response)=> console.log('success', res.json()), 
	  		// 	(err)=>console.log('error', err));
			
	  			});
	}
  		
	// token_id1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InZrdmlzd2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.L4Sbw7E4pB39jn6WAPzNj0AmrHoy-fFh4Fe3Y0Eb1Lo";
	// token_id2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InZpbm9kQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQifQ.pwym-GOyktlUpaDwzGFlCiGs4mzdFF5S4cd6Dhlp-5o";
	signinUser(email:string, password:string) {

		this.getUsers()
  			.subscribe((res:any[]) => {
	  			if (this.doesUserExist(res, email)) {
	  				//getuser
	  				
	  				let	user = res.filter((user) => {
  	 					return user.email==email ;
  	 				})[0]; 
					
					localStorage.setItem('isLoggedIn', 'true');
	  				localStorage.setItem('userID', user.id);
	  				this.currentUser.next(user.id);
	  				
	  				//redirect to user dashboard
	  				// console.log('redirecting to dashboard from authsvc: ', '/user/'+ user.id + "'");
				    this.router.navigate([ '/user', user.id ]);	    
  	 				
				}	      	
									
	  			else {
	  		  		console.log('User does not exist. Please enter correct credentials');
	  		  		 
				} 	
			});
	}


	
	logout() { 
    	 localStorage.removeItem('userID');
    	localStorage.setItem('isLoggedIn', 'false');
    	this.currentUser.next('');
    	 
  	}

}
