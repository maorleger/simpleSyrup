//Angular imports
import { Injectable } from '@angular/core';

//Rxjs imports
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/*
* Service that acts as a link to the navbar. Other components can use this service to 
* interact with the navbar (like the title).
*/
@Injectable()
export class AppBarService{

	private _titleSource = new Subject<string>();
	private _showLoaderSource = new Subject<boolean>();

   	get titleSource(): Observable<string> {
        return this._titleSource.asObservable();
    }

    get showLoaderSource(): Observable<boolean>{
    	return this._showLoaderSource.asObservable();	
    }

    updateTitle(title: string) {
        this._titleSource.next(title);
    }

    updateShowLoader(showLoader: boolean){
    	this._showLoaderSource.next(showLoader);
    }

}