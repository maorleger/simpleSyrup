//Angular imports
import { Injectable } from '@angular/core';

//rxjs imports
import { Observable }    from 'rxjs/Observable';

//Library imports
import { User } from '../lib/domain/user';
import { MockUserData } from '../lib/testing/mockUserData';

//Local folder imports
import { HttpResult } from './httpResult';
import { HttpService } from './http.service';

@Injectable()
export class UserService{

	constructor(private httpService: HttpService){}

	getAllSystemUsers(useMockData: boolean = false): Observable<HttpResult<User[]>>{

		if(useMockData){
			return Observable.of(new HttpResult<User[]>(MockUserData.mockUserData, null));	
		}

		return this.httpService.getManyObjects<User>(User, "users.json");
	}

}