//Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';

//rxjs imports
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Constants } from '../lib/constants';
import { JsonMapper } from '../lib/jsonMapper';

//Local folder imports
import { HttpResult } from './httpResult';
import { HttpMessage } from './httpMessage';
import { HttpMessageType } from './httpMessageType';

//TEST CODE! TODO: Remove after real authentication is implemented
const userEmail = "er@example.com";
const userToken = "EricsToken"

import { Event } from '../lib/domain/domain.module';

//END TEST CODE

@Injectable()
export class HttpService{


	/*
	* Note: Ideally this class wouldn't use both Http and HttpClient. HttpClient was initially implemented for gets, 
	* while Http was added later for posts. I atttempted to remove HttpClient, but had trouble converting the unit
	* tests. I could not get them to work, I decided to be lazy and leave both in here. Don't judge me, ok?
	*/
	constructor(private http: Http, private httpClient: HttpClient){}

	/*
	* Retreives an object from the given URL. If the call is successful, the result is deserialized into the given
	* type.
	*/
	getObject<T>(clazz: { new (): T }, url: string): Observable<HttpResult<T>>{

		return this.httpClient.get(Constants.baseUrl + url + '?' + 'user_email=' + userEmail + '&user_token=' + userToken).map(data => {

	      let resultData: T = JsonMapper.deserialize<T>(clazz, data);

	      return new HttpResult<T>(resultData, null);

	    }).catch((response: Response) => {

	    	return Observable.of(new HttpResult<T>(null, [
                new HttpMessage('Error retreiving object: ' + response.statusText + ".", HttpMessageType.Error)
            ]));

	    });

	}

	/*
	* Gets an array of objects from the given URL. If the call is successful, each object in the array is deserized into the given
	* type.
	*/
	getManyObjects<T>(clazz: { new (): T }, url: string): Observable<HttpResult<T[]>>{
	    
	    return this.httpClient.get(Constants.baseUrl + url + '?' + 'user_email=' + userEmail + '&user_token=' + userToken).map(data => {

			let resultData: any = data;
			let resultObject: T[] = [];

			//Deserialize each of the returned objects into the given type
	      	<any[]>resultData.forEach(object => {
	      		(<T[]>resultObject).push(JsonMapper.deserialize<T>(clazz, object))
	      	})

	      	return new HttpResult<T[]>(resultObject, null);

	    }).catch((response: Response) => {

	    	return Observable.of(new HttpResult<T[]>(null, [
                new HttpMessage('Error retreiving object: ' + response.statusText + ".", HttpMessageType.Error)
            ]));

	    });

	}

	post(url: string, postParams: string): Observable<HttpResult<any>>{
		return this.httpRequest(url, postParams, RequestMethod.Post);
	}

	put(url: string, putParams: string): Observable<HttpResult<any>>{
		return this.httpRequest(url, putParams, RequestMethod.Put);
	}

	private httpRequest(url: string, reququestBody: string, method: RequestMethod): Observable<HttpResult<any>>{
 
     	var headers = new Headers();
 	    headers.set('Content-Type', 'application/json' );
 	    headers.append('X-User-Email', 'er@example.com');
 	    headers.append('X-User-Token', 'EricsToken');
 
 	    let options = new RequestOptions({ headers: headers, method: method });
 	 
 	    return this.http.put(Constants.baseUrl + url, reququestBody, options).map(data => {
 
 	      return new HttpResult<any>(data, null);
 
 	    }).catch((response: Response) => {
 
	    	return Observable.of(new HttpResult<HttpMessage>(null, [
                new HttpMessage('Error posting: ' + response.statusText + ".", HttpMessageType.Error)
            ]));

 
 	    })

 	}

}