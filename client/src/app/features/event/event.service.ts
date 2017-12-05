//Angular imports
import { Injectable }    from '@angular/core';

//rxjs imports
import { Observable }    from 'rxjs/Observable';

//Apollo imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

//Library imports
import { JsonMapper } from '../../lib/jsonMapper';
import { Event } from '../../lib/domain/domain.module';
import { MockUserData } from '../../lib/testing/mockUserData';
import { UtilityFunctions } from '../../lib/utilityFunctions';
import { Participant, User } from '../../lib/domain/domain.module';

//Service module imports
import { HttpMessage, HttpMessageType, HttpResult, HttpService } from '../../serviceModule/service.module'

const GetEventParticipants = gql`
  query GetEventParticipants($eventId: ID!){
    event(id: $eventId){
    	participants{
    		id,
    		status,
    		user{
    			id,
    			firstName,
    			lastName,
    			email,
    			photoUrl
    		}
    	}
    }
  }
`;

const GetEventName = gql`
  query GetEventName($eventId: ID!){
    event(id: $eventId){
    	name
    }
  }
`;

@Injectable()
export class EventService{

	//TEST Data
	mockParticipantData: Participant[] = [];
	mockEventData: Event;

	private _event: Event;

	/*
	* The event this service is currently handling
	*/
	get Event(): Event{
		return this._event;
	}

	set Event(event: Event){
		this._event = event;
	}

	constructor(private httpService: HttpService, private apollo: Apollo){

		//TEST CODE!!! REMOVE ME!
		let participant1: Participant = new Participant();
		participant1.id = 12;
		participant1.status = "Tentative";
		participant1.user = MockUserData.user1;

		let participant2: Participant = new Participant();
		participant2.id = 13;
		participant2.status = "Attending";
		participant2.user = MockUserData.user2;

		let participant3: Participant = new Participant();
		participant3.id = 14;
		participant3.status = "Invited";
		participant3.user = MockUserData.user3;

		let participant4: Participant = new Participant();
		participant4.id = 15;
		participant4.status = "Attending";	
		participant4.user = MockUserData.user4;

		let participant5: Participant = new Participant();
		participant5.id = 15;
		participant5.status = "Attending";		
		participant5.user = MockUserData.user5;

		let participant6: Participant = new Participant();
		participant6.id = 15
		participant6.status = "Tentative";
		participant6.user = MockUserData.user6;

		let participant7: Participant = new Participant();
		participant7.id = 15;
		participant7.status = "Invited";
		participant7.user = MockUserData.user7;

		let participant8: Participant = new Participant();
		participant8.id = 15;
		participant8.status = "Tentative";
		participant8.user = MockUserData.user8;

		let participant9: Participant = new Participant();
		participant9.id = 15;
		participant9.status = "Tentative";	
		participant9.user = MockUserData.user9;
		
		let participant10: Participant = new Participant();
		participant10.id = 15;
		participant10.status = "Tentative";
		participant10.user = MockUserData.user10;

		let participant11: Participant = new Participant();
		participant11.id = 15;
		participant11.status = "Tentative";	
		participant11.user = MockUserData.user11;

		let participant12: Participant = new Participant();
		participant12.id = 15;
		participant12.status = "Attending";	
		participant12.user = MockUserData.user12;

		let participant13: Participant = new Participant();
		participant13.id = 15;
		participant13.status = "Attending";	
		participant13.user = MockUserData.user13;
		
		//this.mockParticipantData.push(participant2, participant1, participant3, participant4, participant5, participant12, participant6, participant7, participant8, participant9, participant10, participant11);
		this.mockParticipantData.push(participant2, participant1, participant3, participant4, participant5, participant6, participant7);
		
		this.mockEventData = new Event(); 
		this.mockEventData.id = 10;
		this.mockEventData.name = "Park Day Bitches!";
		this.mockEventData.participants = this.mockParticipantData;

		//END TEST CODE

	}

	/****************
	* Public methods
	****************/

	/*
	* Gets the Event of the given ID from the API. After the event is retreived, it is saved in this service.
	* so it's info can be later retreived without having to call the API again.
	*/
	getEvent(eventId: number, useMockData: boolean = false): Observable<HttpResult<Event>>{

		//Return fake data
		if(useMockData){


			//Make the mock data have the same id as the given; this just makes testing more convenient
			this.mockEventData.id = eventId;

			return Observable.of(new HttpResult<Event>(this.mockEventData, null)).map(result => {

				//Save the event that was retreived so data won't have to be retreived again
				if(result.isValid){
					this._event = result.value;
				}

				return result;
			});	
		}

		//Grab the event information from the API
		return this.httpService.getObject<Event>(Event, "events/" + eventId + ".json").map(result => {

			//Save the event that was retreived so data won't have to be retreived again
			if(result.isValid){
				this._event = result.value;
			}
			else{
				this._event = null;
			}

			return result;
		});

	}
	
	/*
	* Retreives the participants of the given event using the API. If this service has a cached event, it DOES NOT
	* make an API call; it just returns the cached data.
	*/
	getEventParticipants(eventId: number, useMockData: boolean = false): Observable<HttpResult<Participant[]>>{

		//If cached data exists, just return that
		if(!UtilityFunctions.isNullOrUndefined(this._event) && this._event.id === eventId){
			return Observable.of(new HttpResult<Participant[]>(this._event.participants));
		}

		//Test code
		if(useMockData){
			return Observable.of(new HttpResult<Participant[]>(this.mockParticipantData));
		}

		//Get the participants of the given event
		return this.apollo.query({
			query: GetEventParticipants, 
			variables: {
				eventId: eventId
			}
		}).map(result => {

			let participants: Participant[] = [];

			result.data["event"].participants.forEach(participant => {
				participants.push(JsonMapper.deserialize<Participant>(Participant, participant));
			});

			return new HttpResult<Participant[]>(participants);
		})


	}

	getEventName(eventId: number, useMockData: boolean = false): Observable<HttpResult<string>>{

		//If cached data exists, just return that
		if(!UtilityFunctions.isNullOrUndefined(this._event) && this._event.id === eventId){
			return Observable.of(new HttpResult<string>(this._event.name));
		}

		//Test code
		if(useMockData){
			return Observable.of(new HttpResult<string>("Event #" + eventId));
		}

		//Get the name of the given event
		return this.apollo.query({
			query: GetEventName, 
			variables: {
				eventId: eventId
			}
		}).map(result => {
			return new HttpResult<string>(result.data["event"].name);
		}).catch((response: Response) => {

	    	return Observable.of(new HttpResult<string>(null, [
                new HttpMessage('Error retreiving object: ' + response["message"] + ".", HttpMessageType.Error)
            ]));

	    });

	}

	inviteUsersToEvent(invitedUsers: User[], eventId: number): Observable<HttpResult<any>>{

		//If there aren't any users to invite, do nothing
		if(UtilityFunctions.isNullOrUndefined(invitedUsers) || invitedUsers.length <= 0){
			return;
		}

	    //Build the request body string
	    let putParams = {
	      "event" : {
	        "participants_attributes": invitedUsers.map(user => { return { "user_id" : user.id } })
	      }
	    }

	    return this.httpService.put("events/" + eventId, JSON.stringify(putParams)).map(result => {
	      return result;
	    });
	}

}
