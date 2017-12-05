//Rxjs imports
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

//Service module imports
import { AppBarService } from '../../serviceModule/service.module'

//Local folder imports
import { AppBarComponent } from './appBar.component';

describe('AppBarComponent', () => {

	let testComponent: AppBarComponent;

	//Source for simulating when one one of the url parameters change
  	const titleChangeSource: Subject<string> = new Subject<string>();
  	const showLoaderSource: Subject<boolean> = new Subject<boolean>();

	const appBarServiceStub = {
		get titleSource(): Observable<string> { return titleChangeSource.asObservable(); },
		get showLoaderSource(): Observable<boolean> { return showLoaderSource.asObservable(); }
	};

	beforeEach(() => {

		testComponent = new AppBarComponent(appBarServiceStub as AppBarService);

	});

	it('Title is updated when notified by appBar service', done => {

		let eventName: string = "Park Day!";
		
		//Call onInit to wire up to the appBar service
		testComponent.ngOnInit();

		//Simulate the update title event firing
		titleChangeSource.next(eventName);

		expect(testComponent.title).toEqual(eventName);
		done();

	});

	it('showLoader is updated when notified by appBar service', done => {

		let showLoader: boolean = true;

		//The appbar should not be showing the loader when initalized
		expect(testComponent.showLoader).toBeFalsy();
		
		//Call onInit to wire up to the appBar service
		testComponent.ngOnInit();

		//Simulate the update title event firing
		showLoaderSource.next(showLoader);

		expect(testComponent.showLoader).toEqual(showLoader);
		done();

	});

});