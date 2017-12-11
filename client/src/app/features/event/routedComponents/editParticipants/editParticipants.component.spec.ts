//angular imports
import { ReflectiveInjector } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Participant, User } from '../../../../lib/domain/domain.module';
import { MockActivatedRoute } from '../../../../lib/testing/mockActivatedRoute'

//Service module imports
import { AppBarService, UserService, HttpMessage, HttpMessageType, HttpResult } from '../../../../serviceModule/service.module'

//Feature imports
import { EventService } from '../../event.service';

//Local folder imports
import { EditParticipantsComponent } from './editParticipants.component';

describe('EditParticipantsComponent', () => {

	let testComponent: EditParticipantsComponent;
	let parentRoute: MockActivatedRoute;
	let route: MockActivatedRoute
	
	//Source for simulating when one one of the url parameters change
	let paramChangeSource: Subject<{[key: string] : any}>;

	const appBarServiceStub = {
	  updateTitle(title: String) { },
	  updateShowLoader(showLoader: boolean) { }
	};

	const eventServiceStub = {
	    getEventParticipants(eventId: number): Observable<HttpResult<Participant[]>> { throw Error() },
	    getEventName(eventId: number ): Observable<HttpResult<string>> { throw Error() },
	    getEvent(eventId: number, useMockData: boolean = false): Observable<HttpResult<Event>>{ throw Error(); }
	};

	const userServiceStub = {
		getAllSystemUsers(): Observable<HttpResult<User[]>> { throw Error() }
	};

	beforeEach(() => {

		paramChangeSource = new Subject<{[key: string] : any}>();
	 	parentRoute = new MockActivatedRoute();
	 	parentRoute.paramMap = paramChangeSource.asObservable();
		
		route = new MockActivatedRoute();
		route.parent = parentRoute;

		//Set up a fake getEvent that does nothing stuff doesn't blow up; the eventSubPage class uses this
		spyOn(eventServiceStub, "getEvent").and.callFake(() => {
			return Observable.of(new HttpResult<Event>(null));
		});

		var injector = ReflectiveInjector.resolveAndCreate([{provide: EventService, useValue: eventServiceStub}, {provide: AppBarService, useValue: appBarServiceStub}, {provide: ActivatedRoute, useValue: route}]);

		testComponent = new EditParticipantsComponent(injector, null, null, null, userServiceStub as UserService);

	});

	it('Event participants, event name, and system users are retrieved when event ID router param changes', done => {

		let routeEventId: number = 3;

		spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

			expect(eventId).toEqual(routeEventId);

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<Participant[]>(null));

		});

		spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

			expect(eventId).toEqual(routeEventId);

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<string>(null));

		});
		
		spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getAllSystemUsers
			return Observable.of(new HttpResult<User[]>(null));
		});

		testComponent.ngOnInit();

		//Emit parameter change
		paramChangeSource.next({eventId: routeEventId, get(){ return routeEventId; }});

		expect(eventServiceStub.getEventParticipants).toHaveBeenCalled();
		expect(eventServiceStub.getEventName).toHaveBeenCalled();
		expect(userServiceStub.getAllSystemUsers).toHaveBeenCalled();

		//There weren't any load errors, so content should be showing
		expect(testComponent.showLoadError).toBeFalsy();

		//Update the url parameter, getEventOverview should be called again.
	    routeEventId = 4;

	    //Emit parameter change
	    paramChangeSource.next({eventId: routeEventId, get(){ return routeEventId; }});

	    expect(eventServiceStub.getEventParticipants).toHaveBeenCalledTimes(2);
	    expect(eventServiceStub.getEventName).toHaveBeenCalledTimes(2);
	    expect(userServiceStub.getAllSystemUsers).toHaveBeenCalledTimes(2);

		//There weren't any load errors, so content should be showing
		expect(testComponent.showLoadError).toBeFalsy();

	    done();

	});

	it("loading is true while items are being retreived", done => {

		//Variable that keeps track of what value we expect appBarServiceStub.updateShowLoader to be called with.
		//The first call should be true
		let expectedShowLoaderValue: boolean = true;

		//Component should be initialized with loading = false
		expect(testComponent.loading).toBeFalsy();

		spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<Participant[]>(null));

		});

		spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<string>(null));

		});
		
		spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

			//After all 3 observables have resolved, the loader shouldn't be showing anymore
			expectedShowLoaderValue = false;

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getAllSystemUsers
			return Observable.of(new HttpResult<User[]>(null));
		});

		spyOn(appBarServiceStub, "updateShowLoader").and.callFake((showLoader: boolean) => {
			expect(showLoader).toEqual(expectedShowLoaderValue);
		});

		testComponent.ngOnInit();

	    //Emit parameter change
	    paramChangeSource.next({eventId: 10, get(){ return 10; }});

		expect(appBarServiceStub.updateShowLoader).toHaveBeenCalledTimes(2);
		expect(testComponent.loading).toBeFalsy();

		done();

	});

	it("loading is not updated until all pictures are loaded", done => {

		let testUser1: User = new User();
		testUser1.firstName = "Test";
		testUser1.lastName = "User";
		testUser1.id = 1;
		testUser1.photoUrl = "somePhoto.png";

		//Component should be initialized with loading = false
		expect(testComponent.loading).toBeFalsy();

		spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<Participant[]>(null));

		});

		spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<string>(null));

		});
		
		spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {
			return Observable.of(new HttpResult<User[]>([testUser1]));
		});

		//This spy doesn't need to do anything; just creating it so we can keep track of how often it's called
		spyOn(appBarServiceStub, "updateShowLoader").and.callFake((showLoader: boolean) => { });

		testComponent.ngOnInit();

	    //Emit parameter change
	    paramChangeSource.next({eventId: 10, get(){ return 10; }});

	    //Since one of the users has a photoUrl, the component should still indicate it's loading
		expect(appBarServiceStub.updateShowLoader).toHaveBeenCalledTimes(1);
		expect(testComponent.loading).toBeTruthy();

		//Indicate the photo for the test user has completed loading
		testComponent.onPictureLoaded(testUser1.photoUrl);

		//Now that the one picture has completed loading, the loading flag should be false
		expect(appBarServiceStub.updateShowLoader).toHaveBeenCalledTimes(2);
		expect(testComponent.loading).toBeFalsy();		

		done();

	});

	it("Calls the app bar service upon receiving the event name", done => {

		let eventName = "Ace's birthday";

		spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

			//Return mock participant data
			return Observable.of(new HttpResult<Participant[]>(null));

		});	

		spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

			//Return mock user data
			return Observable.of(new HttpResult<User[]>(null));

		});

		spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<string>(eventName));

		});

		spyOn(appBarServiceStub, "updateTitle").and.callFake((title: string) => {
			expect(title).toEqual(eventName);
		});

		//Need to call onInit to wire up subscriptions
		testComponent.ngOnInit();

		//Emit parameter change so the event name is retrieved
		paramChangeSource.next({eventId: 10, get(){ return 10; }});

		expect(eventServiceStub.getEventName).toHaveBeenCalled();
		expect(appBarServiceStub.updateTitle).toHaveBeenCalled();

		done();

	});

	it('Correctly builds users And participants list', done => {

		let testUser1: User = new User();
		testUser1.firstName = "Test";
		testUser1.lastName = "User";
		testUser1.id = 1;

		let testUser2: User = new User();
		testUser2.firstName = "Test";
		testUser2.lastName = "User2";
		testUser2.id = 2;

		let participant: Participant = new Participant();
		participant.user = testUser1;

		spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

			//Return mock participant data
			return Observable.of(new HttpResult<Participant[]>([participant]));

		});	

		spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

			//Return mock user data
			return Observable.of(new HttpResult<User[]>([testUser1, testUser2]));

		});

		spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

			//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
			return Observable.of(new HttpResult<string>(null));

		});

		//Need to call onInit to wire up subscriptions
		testComponent.ngOnInit();

		//Emit parameter change so the users and participants are retrieved
		paramChangeSource.next({eventId: 2, get(){ return 2; }});

		expect(testComponent.UsersAndParticipants.length).toEqual(2);
		expect(testComponent.UsersAndParticipants[0]).toEqual(participant);
		expect(testComponent.UsersAndParticipants[1]).toEqual(testUser2);
		done();

	});

	it('isUserObject() works as expected', done => {

		expect(testComponent.isUserObject(new User())).toBeTruthy();
		expect(testComponent.isUserObject(new Participant())).toBeFalsy();
		done();

	});

	it('isParticipantObject() works as expected', done => {

		expect(testComponent.isParticipantObject(new Participant())).toBeTruthy();
		expect(testComponent.isParticipantObject(new User())).toBeFalsy();
		done();

	});

	it('Clicking a user chip adds\\removes them to the invited array', done => {

		let testUser: User = new User();
		testUser.firstName = "Test";
		testUser.lastName = "User";

		//Simulates the user selecting someone to invite
		testComponent.onUserBigChipClicked(testUser);

		expect(testComponent.invitedUsers.length).toEqual(1);
		expect(testComponent.invitedUsers[0]).toEqual(testUser);

		//Simulates the user removing an invite
		testComponent.onUserBigChipClicked(testUser);

		expect(testComponent.invitedUsers.length).toEqual(0);

		done();

	});

	it('isUserInvited() works as expected', done => {

		let testUser: User = new User();
		testUser.firstName = "Test";
		testUser.lastName = "User";

		expect(testComponent.isUserInvited(testUser)).toBeFalsy();

		testComponent.addInvitedUser(testUser);

		expect(testComponent.isUserInvited(testUser)).toBeTruthy();		

		done();

	});

	it('disableInviteButton() works as expected', done => {

		let testUser: User = new User();
		testUser.firstName = "Test";
		testUser.lastName = "User";

		expect(testComponent.disableInviteButton).toBeTruthy();

		testComponent.addInvitedUser(testUser);

		expect(testComponent.disableInviteButton).toBeFalsy();		

		done();

	});

	describe("Content error component is displayed when", () =>{

		it("there is an error loading the event name", (done) => {

			spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
				return Observable.of(new HttpResult<Participant[]>(null));

			});

			spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

				//Simulate an error loading the event name
				return Observable.of(new HttpResult<string>(null, [new HttpMessage("error", HttpMessageType.Error)]));

			});
			
			spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getAllSystemUsers
				return Observable.of(new HttpResult<User[]>(null));

			});

			//Wire up the component subscriptions
			testComponent.ngOnInit();

			//Emit parameter change to trigger loading calls
			paramChangeSource.next({eventId: 0, get(){ return 0; }});

			//Component should have tried to load event name, system users, and event participants
			expect(eventServiceStub.getEventParticipants).toHaveBeenCalled();
			expect(eventServiceStub.getEventName).toHaveBeenCalled();
			expect(userServiceStub.getAllSystemUsers).toHaveBeenCalled();

			//Since the event name errored, the error component should be displayed
			expect(testComponent.showLoadError).toBeTruthy();

			done();

		});

		it("there is an error loading the system users", (done) => {

			spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
				return Observable.of(new HttpResult<Participant[]>(null));

			});

			spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
				return Observable.of(new HttpResult<string>(null));

			});
			
			spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

				//Simulate an error loading the system users
				return Observable.of(new HttpResult<string>(null, [new HttpMessage("error", HttpMessageType.Error)]));

			});

			//Wire up the component subscriptions
			testComponent.ngOnInit();

			//Emit parameter change to trigger loading calls
			paramChangeSource.next({eventId: 0, get(){ return 0; }});

			//Component should have tried to load event name, system users, and event participants
			expect(eventServiceStub.getEventParticipants).toHaveBeenCalled();
			expect(eventServiceStub.getEventName).toHaveBeenCalled();
			expect(userServiceStub.getAllSystemUsers).toHaveBeenCalled();

			//Since the event name errored, the error component should be displayed
			expect(testComponent.showLoadError).toBeTruthy();

			done();

		});

		it("there is an error loading the event participants", (done) => {

			spyOn(eventServiceStub, "getEventParticipants").and.callFake((eventId) => {

				//Simulate an error loading the event participants
				return Observable.of(new HttpResult<string>(null, [new HttpMessage("error", HttpMessageType.Error)]));

			});

			spyOn(eventServiceStub, "getEventName").and.callFake((eventId) => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getEventParticipents
				return Observable.of(new HttpResult<string>(null));

			});
			
			spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

				//Need to return an observable here since the EditParticipantsComponent component subscribes to getAllSystemUsers
				return Observable.of(new HttpResult<User[]>(null));

			});

			//Wire up the component subscriptions
			testComponent.ngOnInit();

			//Emit parameter change to trigger loading calls
			paramChangeSource.next({eventId: 0, get(){ return 0; }});

			//Component should have tried to load event name, system users, and event participants
			expect(eventServiceStub.getEventParticipants).toHaveBeenCalled();
			expect(eventServiceStub.getEventName).toHaveBeenCalled();
			expect(userServiceStub.getAllSystemUsers).toHaveBeenCalled();

			//Since the event name errored, the error component should be displayed
			expect(testComponent.showLoadError).toBeTruthy();

			done();

		});

	});

});