export class Appt {
	
	public id:number;
	public date: Date;
	public StartTime: Date;
	public EndTime: Date;
    public RequestorID: number;
    public AcceptorID: number;
    public Purpose: string;
    public Venue: string;
    public Status: string;
    public RequestorStatus: any;
    public AcceptorStatus: any;
    public RequestorReminder: boolean;
    public AcceptorReminder: boolean;
	

	constructor( id: number, date: Date, StartTime: Date, EndTime: Date, 
		RequestorID: number, AcceptorID: number, Purpose: string,
		Venue: string, Status: string, RequestorStatus: any, AcceptorStatus: any, RequestorReminder: boolean,
		AcceptorReminder: boolean ) {
		
		this.id = id;
		this.date = date;
		this.StartTime = StartTime;
		this.EndTime = EndTime;
		this.RequestorID = RequestorID;
		this.AcceptorID = AcceptorID;
		this.Purpose = Purpose;
		this.Venue = Venue;
		this.Status = Status;
		this.RequestorStatus = RequestorStatus;
		this.AcceptorStatus = AcceptorStatus;
		this.RequestorReminder = RequestorReminder;
		this.AcceptorReminder = AcceptorReminder;
	}
}


