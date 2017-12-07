//Service module imports
import { HttpResult, HttpService } from '../../serviceModule/service.module'

//rxjs imports
import { Observable } from 'rxjs/Observable';

//Apollo
import { Apollo } from 'apollo-angular';

//Library imports
import { Event, Participant, User } from '../../lib/domain/domain.module';

//Local folder imports
import { EventService } from './event.service';

describe('EventService', () => {

	let testEventService: EventService;

	const httpServiceStub = {
		getObject<T>(clazz: { new (): T }, url: string): Observable<HttpResult<T>>{ throw new Error();},
		put(url: string, postParams: string): Observable<HttpResult<any>>{ throw new Error(); }
	}

	const apolloStub = {
		query(data: any): Observable<{
			data: {},
			errors ?: any[],
			loading: boolean,
			networkStatus: any,
			stale: boolean
		}> { throw new Error(); }
	}

	beforeEach(() => {

		testEventService = new EventService(httpServiceStub as HttpService, apolloStub as Apollo);

	});

	it('getEvent() gets Event from API', done => {

		let eventId: number = 28;

		spyOn(httpServiceStub, "getObject").and.callFake((clazz, url) => {

			//Ensure getEvent is calling the right URL
			expect(url).toEqual("events/" + eventId + ".json");

			//Make a fake event to return
			let event: Event = new Event();
			event.id = eventId;

			return Observable.of(new HttpResult<Event>(event));

		});


		testEventService.getEvent(eventId).subscribe(result => {

			//Ensure the http service was called
			expect(httpServiceStub.getObject).toHaveBeenCalled();

			//Ensure the result of the API call is saved
			expect(testEventService.Event).toBeTruthy();
			expect(testEventService.Event.id).toEqual(eventId);

			done();

		})

	});

	it("getEventParticipants() returns cached data for requested event", done => {

		let eventId: number = 28;

		//Set up some fake participant data
		let user: User = new User();
		user.firstName = "Test";
		user.lastName = "User";
		user.photoUrl = "/pictureUrl.png";

		let participant: Participant = new Participant();
		participant.id = 12;
		participant.status = "Tentative";
		participant.user = user;

		let fakeParticipants: Participant[] = [participant];

		spyOn(httpServiceStub, "getObject").and.callFake((clazz, url) => {

			//Set up fake Event with participant data
			let event: Event = new Event();
			event.id = eventId;
			event.participants = [participant];

			//Return the fake data
			return Observable.of(new HttpResult<Event>(event));

		});

		testEventService.getEvent(eventId).subscribe(result => {

			testEventService.getEventParticipants(eventId).subscribe(result => {

				//Ensure the array returned is the same as the participants provided
				expect(result.value.length).toEqual(fakeParticipants.length);

				for(let counter: number = 0; counter < result.value.length; counter++){
					expect(result.value[counter]).toEqual(fakeParticipants[counter]);
				}

				done();
			});

		});


	});

	it("getEventParticipants() returns cached participant if event id matches cached event", done => {

		//Add an event to the service cache
		let event: Event = new Event();
		event.id = 5;
		event.participants = [new Participant()];
		event.participants[0].id = 23;
		testEventService.Event = event;

		//Get the event participants for the cached event; since that event is cached, it SHOULD NOT use apollo.
		testEventService.getEventParticipants(event.id).subscribe(result => {

			//The participants returned should be of the cached event
			expect(result.isValid).toBeTruthy();
			expect(result.value === event.participants).toBeTruthy();

			done();

		});


	});

	it("getEventParticipants() calls API when participants aren't in cache", done => {
		
		let eventId: number = 4;

		//Set up an array of mock participants
		let apolloParticipants: Participant[] = [new Participant()];
		apolloParticipants[0].id = 1;
		apolloParticipants[0].eventId = eventId;
		apolloParticipants[0].userId = 78;
		apolloParticipants[0].status = "Accepted";

		//The service should start out without a cached event
		expect(testEventService.Event).toBeUndefined();

		spyOn(apolloStub, "query").and.callFake((data) => {

			//Ensure apollo is being called with the right event id
			expect(+data["variables"]["eventId"]).toEqual(eventId);

			return Observable.of({
				data: {
					event: {
						participants: [
							{
								id: 1,
								eventId: eventId,
							 	status: "Accepted",
								userId: 78
							}
						]
					}
				}
			});

		});

		//Get the event participants
		testEventService.getEventParticipants(eventId).subscribe(result => {

			//Result should be participants set up in the mock apollo service
			//(have to manually check each value because I can't figure out javascript object equality)
			expect(result.value.length === apolloParticipants.length).toBeTruthy();
			expect(result.value[0].id === apolloParticipants[0].id).toBeTruthy();
			expect(result.value[0].eventId === apolloParticipants[0].eventId).toBeTruthy();
			expect(result.value[0].user === apolloParticipants[0].user).toBeTruthy();
			expect(result.value[0].userId === apolloParticipants[0].userId).toBeTruthy();
			expect(result.value[0].status === apolloParticipants[0].status).toBeTruthy();

			done();

		});

		//Since there wasn't a cached event, Apollo should have been used to reach the api.
		expect(apolloStub.query).toHaveBeenCalled();


	});

	it("inviteUsersToEvent() works as expected", (done) => {

		let userToInvite: User = new User();
		userToInvite.id = 47;

		let event: Event = new Event();
		event.id = 12
		event.participants = [];

		testEventService.Event = event;

		spyOn(httpServiceStub, "put").and.callFake((url: string, postParams: string) => {

			//Ensure the api was called with the right parameters
			expect(url).toEqual("events/" + event.id);
			expect(postParams).toEqual("{\"event\":{\"participants_attributes\":[{\"user_id\":" + userToInvite.id + "}]}}");

			return Observable.of(new HttpResult<any>({_body: ("{\"id\":" + event.id + ",\"participants\":[{\"id\":" + event.id + ",\"userId\":" + userToInvite.id + ",\"eventId\":" + event.id + "}]}")})); 

		});

		testEventService.inviteUsersToEvent([userToInvite], event.id).subscribe(() => {
			expect(httpServiceStub.put).toHaveBeenCalled();

			//After the invite call, the cached event should have been updated with the new participants
			expect(event.participants).toBeTruthy();
			expect(event.participants.length).toEqual(1);
			expect(event.participants[0].userId).toEqual(userToInvite.id);

			done();
		});

	});

});