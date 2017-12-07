//angular imports
import { ReflectiveInjector } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Event } from '../../../lib/domain/domain.module';
import { MockActivatedRoute } from '../../../lib/testing/mockActivatedRoute'

//Service module imports
import { AppBarService, HttpMessage, HttpMessageType, HttpResult } from '../../../serviceModule/service.module'

//Event imports
import { EventService } from '../event.service';
import { EventSubPageComponent } from './eventSubPage.component'

describe('EventSubPageComponent', () => {

	let testComponent: EventSubPageComponent;
	let parentRoute: MockActivatedRoute;
	let route: MockActivatedRoute;

	//Source for simulating when one one of the url parameters change
	let paramChangeSource: Subject<{[key: string] : any}>;

	const appBarServiceStub = {
	  updateShowLoader(showLoader: boolean) { }
	};

	const eventServiceStub = {
	    getEvent(eventId: number, useMockData: boolean = false): Observable<HttpResult<Event>>{ throw Error(); },
	    get Event() { return null },
  		set Event(value) {  }
	};

	beforeEach(() => {

		paramChangeSource = new Subject<{[key: string] : any}>();
	 	parentRoute = new MockActivatedRoute();
	 	parentRoute.paramMap = paramChangeSource.asObservable();
		
		route = new MockActivatedRoute();
		route.parent = parentRoute;

		var injector = ReflectiveInjector.resolveAndCreate([{provide: EventService, useValue: eventServiceStub}, {provide: AppBarService, useValue: appBarServiceStub}, {provide: ActivatedRoute, useValue: route}]);

		testComponent = new EventSubPageComponent(injector);

	});

	it("Updates event service cache when it's missing", (done) => {

		let mockEventId: number = 4687;

		spyOn(eventServiceStub, "getEvent").and.callFake((eventId: number, useMockData: boolean = false) => {

			//Should be call for the appropriate event
			expect(eventId).toEqual(mockEventId);

			return Observable.of(new HttpResult<Event>(null));

		});

		testComponent.ngOnInit();

		//Emit parameter change to kick things off
		paramChangeSource.next({eventId: mockEventId, get(){ return mockEventId; }});

		//Event service should have been called to get the event
		expect(eventServiceStub.getEvent).toHaveBeenCalled();

		done();

	});

	it("Does not update event service cache when it already exists", (done) => {

		let mockEventId: number = 4687;

		let event: Event = new Event();
		event.id = mockEventId;

		spyOnProperty(eventServiceStub, "Event", "get").and.returnValue(event);

		spyOn(eventServiceStub, "getEvent").and.callFake((eventId: number, useMockData: boolean = false) => {

			//If the method is called, that's an error
			throw Error("EventService.getEvent called when it should not have been");

		});

		testComponent.ngOnInit();

		//Emit parameter change to kick things off
		paramChangeSource.next({eventId: mockEventId, get(){ return mockEventId; }});

		done();

	});

	describe("setLoading()", () => {

		it("updates loading() property", (done) => {

			//Component should be initalized with loading = false
			expect(testComponent.loading).toBeFalsy();

			testComponent.setLoading(true);

			//Loading should now be true
			expect(testComponent.loading).toBeTruthy();

			done();

		});

		it("updates formState() as expected", (done) => {

			//Component should be initalized with formState = 'default'
			expect(testComponent.formState).toEqual("default");

			testComponent.setLoading(true);

			expect(testComponent.formState).toEqual("loading");

			testComponent.setLoading(false);
			expect(testComponent.formState).toEqual("loaded");

			done();

		});

		it("Updates the appbar title", (done) => {

			spyOn(appBarServiceStub, "updateShowLoader").and.callFake((showLoader: boolean) => {

				expect(showLoader).toBeTruthy();
				done();

			});

			testComponent.setLoading(true);

			expect(appBarServiceStub.updateShowLoader).toHaveBeenCalled();

		});

	});

});