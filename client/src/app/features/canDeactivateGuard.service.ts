//Angular imports
import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';

//rxjs imports
import { Observable }    from 'rxjs/Observable';
 
export interface CanComponentDeactivate {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
 
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
	
	/*
	* Determines if the current route can be deactivated. If the given component has a canDeactivate method, that is used to determine if the
	* current route can be deactivated. Otherwise, deactivation is allowed.
	*/
	canDeactivate(component: CanComponentDeactivate) {

		//If the given component has a 'canDeactivate' method, use it to determine if the route can be deactivated. Otherwise, allow deactivation
		return component.canDeactivate ? component.canDeactivate() : true;

	}
}