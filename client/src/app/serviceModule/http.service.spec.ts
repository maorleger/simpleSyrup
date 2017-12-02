//Angular imports
import { HttpClient } from '@angular/common/http';

//Rxjs imports
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Event } from '../lib/domain/domain.module';
import { UtilityFunctions } from '../lib/utilityFunctions';

//Local folder imports
import { HttpResult } from './httpResult';
import { HttpMessage } from './httpMessage';
import { HttpService } from './http.service';
import { HttpMessageType } from './httpMessageType';

describe('HttpService', () => {

	let testHttpService: HttpService;

	const httpClientStub = {
        get(url: string): Observable<Response> { throw Error(); }
    };

	beforeEach(() => {
		testHttpService = new HttpService(null, httpClientStub as HttpClient);
	});

	it("getObject returns result with error message if object is not found", done => {

		let objectUrl: string = "events/10.json";

		spyOn(httpClientStub, "get").and.callFake((url: string) => {
			
			///Http client service should be called with the url that was passed to the getObject method
			expect(url.includes(objectUrl)).toBeTruthy()

			return Observable.throw("Error");

		});

		testHttpService.getObject(Event, objectUrl).subscribe((result: HttpResult<Event>) => {

			expect(UtilityFunctions.isNullOrUndefined(result)).toBeFalsy();
			expect(result.value).toBeNull();
			expect(UtilityFunctions.isNullOrUndefined(result.resultMessages)).toBeFalsy();
			expect(result.resultMessages.length).toEqual(1);
			expect(result.resultMessages[0].type).toEqual(HttpMessageType.Error);

			done();

		});

	});

	it("getObject returns result with object", done => {

		let objectUrl: string = "events/10.json";
		let returnEvent: Event = new Event();
		returnEvent.id = 1;

		spyOn(httpClientStub, "get").and.callFake((url: string) => {
			
			///Http client service should be called with the url that was passed to the getObject method
			expect(url.includes(objectUrl)).toBeTruthy()

			return Observable.of(returnEvent);

		});

		testHttpService.getObject(Event, objectUrl).subscribe((result: HttpResult<Event>) => {

			expect(UtilityFunctions.isNullOrUndefined(result)).toBeFalsy();
			expect(UtilityFunctions.isNullOrUndefined(result.value)).toBeFalsy();
			expect(UtilityFunctions.isNullOrUndefined(result.resultMessages)).toBeTruthy();
			expect(result.value).toEqual(returnEvent);

			done();

		});

	});

	it("getManyObjects returns result with error message if objects are not found", done => {

		let objectUrl: string = "events/10.json";

		spyOn(httpClientStub, "get").and.callFake((url: string) => {
			
			///Http client service should be called with the url that was passed to the getObject method
			expect(url.includes(objectUrl)).toBeTruthy()

			return Observable.throw("Error");

		});

		testHttpService.getManyObjects(Event, objectUrl).subscribe((result: HttpResult<Event[]>) => {

			expect(UtilityFunctions.isNullOrUndefined(result)).toBeFalsy();
			expect(result.value).toBeNull();
			expect(UtilityFunctions.isNullOrUndefined(result.resultMessages)).toBeFalsy();
			expect(result.resultMessages.length).toEqual(1);
			expect(result.resultMessages[0].type).toEqual(HttpMessageType.Error);

			done();

		});

	});

	it("getManyObjects returns result with array", done => {

		let objectUrl: string = "events/10.json";
		let returnEvent: Event = new Event();
		returnEvent.id = 1;

		let returnEvent2: Event = new Event();
		returnEvent2.id = 2;

		let returnArray: Event[] = [returnEvent, returnEvent2];

		spyOn(httpClientStub, "get").and.callFake((url: string) => {
			
			///Http client service should be called with the url that was passed to the getObject method
			expect(url.includes(objectUrl)).toBeTruthy()

			return Observable.of(returnArray);

		});

		testHttpService.getManyObjects(Event, objectUrl).subscribe((result: HttpResult<Event[]>) => {

			expect(UtilityFunctions.isNullOrUndefined(result)).toBeFalsy();
			expect(UtilityFunctions.isNullOrUndefined(result.value)).toBeFalsy();
			expect(UtilityFunctions.isNullOrUndefined(result.resultMessages)).toBeTruthy();
			expect(result.value).toEqual(returnArray);

			done();

		});

	});	

});