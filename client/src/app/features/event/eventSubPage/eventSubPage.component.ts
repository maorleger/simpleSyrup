//Angular imports
import { Injector, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Event } from '../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../lib/utilityFunctions';


//Service module imports
import { AppBarService, HttpResult } from '../../../serviceModule/service.module'

//Feature imports
import { EventService } from '../event.service';

export class EventSubPageComponent implements OnInit{

	//Property backing variables
	private _loading: boolean = false;
	private _formState: string = "default";

	protected eventService: EventService;
	protected appBarService: AppBarService;
	protected route: ActivatedRoute;

	/***********
	* Properties
	************/

	get formState(): string{
		return this._formState;
	}

	/*
	* Indicates if this component is loading data
	*/
	public get loading(): boolean{
		return this._loading;
	}

	constructor(injector: Injector){
		this.eventService = injector.get(EventService);
		this.appBarService = injector.get(AppBarService);
		this.route = injector.get(ActivatedRoute);
	}

	/****************
	* ng Events
	****************/

	ngOnInit() {

		//Whenever the id of the event changes, update the event service cache
		this.route.parent.paramMap.switchMap((params: ParamMap) => {

			//If the event service doesn't have a cached event, or it differs from the new event id fetch the event:
			if(UtilityFunctions.isNullOrUndefined(this.eventService.Event) || this.eventService.Event.id != +params.get('eventId')){

				//Don't need to actually do anything once this resolves; the event service puts it in the cache, just need to kick off the call
				this.eventService.getEvent(+params.get('eventId')).subscribe();
			}

			return Observable.of(null);

		}).subscribe();

	}

	/****************
	* Public methods
	****************/

   	/*
   	* Updates the _loading variable of this component to the given value. Passes that value along 
   	* to the app bar service so it shows\hides the loader bar.
   	*/
	setLoading(val: boolean){
		
		this._loading = val;

		if(this._loading){
			this._formState = "loading";
		}

		else{
			this._formState = "loaded";
		}

		this.appBarService.updateShowLoader(val);

	}


}