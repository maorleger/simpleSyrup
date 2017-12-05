//Angular imports
import { Injectable } from '@angular/core';

//rxjs imports
import { Observable }    from 'rxjs/Observable';

//Library imports
import { User } from '../lib/domain/user';
import { MockUserData } from '../lib/testing/mockUserData';
import { UtilityFunctions } from '../lib/utilityFunctions';

//Local folder imports
import { HttpResult } from './httpResult';
import { HttpService } from './http.service';

@Injectable()
export class UserService{

	private _cachedUsers: User[];

	get CachedUsers(): User[]{
		return this._cachedUsers;
	}

	constructor(private httpService: HttpService){}

	getAllSystemUsers(useMockData: boolean = false): Observable<HttpResult<User[]>>{

		if(useMockData){
			return Observable.of(new HttpResult<User[]>(MockUserData.mockUserData, null));	
		}

		else if(!UtilityFunctions.isNullOrUndefined(this._cachedUsers)){
			return Observable.of(new HttpResult<User[]>(this._cachedUsers));
		}

		return this.httpService.getManyObjects<User>(User, "users.json").map(result => {

			//Save the event that was retreived so data won't have to be retreived again
			if(result.isValid){
				this._cachedUsers = result.value;
			}
			else{
				this._cachedUsers = null;
			}

			return result;
		});
	}

}