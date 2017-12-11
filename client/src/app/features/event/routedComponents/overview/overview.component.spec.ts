//angular imports
import { ActivatedRoute } from '@angular/router';

//rxjs imports
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//Lirbary imports
import { MockActivatedRoute } from '../../../../lib/testing/mockActivatedRoute';
import { Event, Participant, User } from '../../../../lib/domain/domain.module';

//Service module imports
import { HttpResult, AppBarService, UserService } from '../../../../serviceModule/service.module'

//Feature imports
import { EventService } from '../../event.service';

//Local folder imports
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {

  let routeEventId: number;
  let testComponent: OverviewComponent;

  let route: MockActivatedRoute

  //Source for simulating when one one of the url parameters change
  const paramChangeSource: Subject<{[key: string] : any}> = new Subject<{[key: string] : any}>();

  const eventServiceStub = {
      getEvent(eventId: number): Observable<HttpResult<Event>> { throw Error("Not implemented.") }
  };

  const appBarServiceStub = {
      updateTitle(title: String) {},
      updateShowLoader(showLoader: boolean) {}
  };

  const userServiceStub = {
    getAllSystemUsers(): Observable<HttpResult<User[]>> { return Observable.of(new HttpResult<User[]>(null)) }
  };
  
  beforeEach(() => {

    route = new MockActivatedRoute();
    route.paramMap = paramChangeSource.asObservable();

    testComponent = new OverviewComponent(eventServiceStub as EventService, appBarServiceStub as AppBarService, route as ActivatedRoute, userServiceStub as UserService);

  });

  it('Event overview is retrieved when event ID router param changes', done => {

    let routeEventId: number = 3;

    spyOn(eventServiceStub, "getEvent").and.callFake((eventId) => {

      //ID of the event info being retreived should be the new id in the url
      expect(eventId).toEqual(routeEventId);
      done();

      //Need to return an observable here since the EditParticipantsComponent component subscribes to getEventOverview
      return Observable.of(new HttpResult<Event>(null, null));

    });

    testComponent.ngOnInit();

    //Emit parameter change
    paramChangeSource.next({eventId: routeEventId, get(){ return routeEventId; }});

    expect(eventServiceStub.getEvent).toHaveBeenCalled();

    //Update the url parameter, getEventOverview should be called again.
    routeEventId = 4;

    //Emit parameter change
    paramChangeSource.next({eventId: routeEventId, get(){ return routeEventId; }});

    expect(eventServiceStub.getEvent).toHaveBeenCalledTimes(2);

  });

  it('Updates title when event information is returned', done => {

    let eventName = "Park Day!";

    spyOn(eventServiceStub, "getEvent").and.callFake((eventId) => {

      let returnEvent = new Event;
      returnEvent.name = eventName;

      //Need to return an observable here since the EditParticipantsComponent component subscribes to getEventOverview
      return Observable.of(new HttpResult<Event>(returnEvent, null));

    });

    spyOn(appBarServiceStub, "updateTitle").and.callFake((title: string) => {
       
      //This method should have been called with the title of the event that was returned
      expect(title).toEqual(eventName);

      done();

    });

    //Call onInit to wire up the subscriptions to the AppBar and Event services
    testComponent.ngOnInit();

    //Emit parameter change to kick things off
    paramChangeSource.next({eventId: routeEventId, get(){ return 1 }});

    //Ensure the services were engaged
    expect(eventServiceStub.getEvent).toHaveBeenCalled();
    expect(appBarServiceStub.updateTitle).toHaveBeenCalled();

  });

  it("System users are retrieved when component is initalized", (done) => {

    let testUser1: User = new User();
    testUser1.firstName = "Test";
    testUser1.lastName = "User";
    testUser1.id = 1;

    let testUser2: User = new User();
    testUser2.firstName = "Test";
    testUser2.lastName = "User2";
    testUser2.id = 2;

    spyOn(userServiceStub, "getAllSystemUsers").and.callFake(() => {

      //Return mock user data
      return Observable.of(new HttpResult<User[]>([testUser1, testUser2]));

    });

    //Need to call onInit to wire up subscriptions
    testComponent.ngOnInit();

    expect(userServiceStub.getAllSystemUsers).toHaveBeenCalled();
    expect(testComponent.systemUsers.length).toEqual(2);
    expect(testComponent.systemUsers[0]).toEqual(testUser1);
    expect(testComponent.systemUsers[1]).toEqual(testUser2);

    done();

  });

  describe("EventParticipants property", () => {

      it('Returns null if participants do not exist', () => {

        spyOn(eventServiceStub, "getEvent").and.callFake((eventId) => {
          return Observable.of(new HttpResult<Event>(null, null));
        });

        testComponent.ngOnInit();
        expect(testComponent.eventParticipants).toBeNull();

      });

      it('Returns participants of event', () => {

        let mockEventData: Event = new Event();

        let participant: Participant = new Participant();
        participant.id = 15;
        participant.user = new User();
        participant.user.firstName = "Justin";
        participant.user.lastName = "Mortara";
        participant.status = "Attending";    

        mockEventData.participants = [participant];

        spyOn(eventServiceStub, "getEvent").and.callFake((eventId) => {
          return Observable.of(new HttpResult<Event>(mockEventData, null));
        });

        testComponent.ngOnInit();

        //Need to emit parameter change for component to use an intial parameter
        paramChangeSource.next({eventId: routeEventId, get(){ return routeEventId; }});

        expect(testComponent.eventParticipants).toEqual([participant]);

      });

  });

});
