//Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

//Library imports
import { UtilityFunctions } from '../../../../lib/utilityFunctions';
import { Event, Participant, User } from '../../../../lib/domain/domain.module';

//Feature imports
import { EventService } from '../../event.service';

//Service module imports
import { HttpResult, AppBarService, UserService } from '../../../../serviceModule/service.module'

//Library imports
import { Transitions } from '../../../../lib/animations/transitions';

//Local component imports
import { ParticipantCardComponent } from '../../childComponents/participantCard/participantCard.component'

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    Transitions.fadeInOut
  ]
})
export class OverviewComponent implements OnInit {

  //Property backing variables
  private _event: Event;
  private _loading: boolean = false;
  private _systemUsers: User[];

  /*
  * Event this component is displaying
  */
  get event(): Event{
    return this._event;
  }

  /*
  * Indicates if this component is loading data
  */
  get loading(): boolean{
    return this._loading;
  }

  /*
  * Participants of the event this component is displaying
  */ 
  get eventParticipants(): Participant[]{
    return UtilityFunctions.isNullOrUndefined(this.event) ? null : this.event.participants;
  }

  /*
  * The system users retreived from the UserService. These are used to proactively load the user photos.
  */
  get systemUsers(): User[]{
    return this._systemUsers;
  }

  constructor(private eventService: EventService, private appBarService: AppBarService, private route: ActivatedRoute, private userService: UserService) { }

  /****************
  * ng Events
  ****************/

  ngOnInit() {

    //Preemptively render (but don't actually display) all the system users so the pictures are loaded before
    //the user goes to the edit participants page. Note, grabbing all user isn't needed because some will already
    //be participants so they don't need their picture loaded again (since particpants are already being displayed). 
    //But doing that extra work won't yield and practical benefits so f that.
    this.userService.getAllSystemUsers().subscribe(result => {

      //If the result was valid, update the systemUsers property. If call failed for whatever reason, 
      //don't do anything since this is not yet determintal to the user.
      if(result.isValid){

        //Filter out all users that are already participants and add them to the users array
        if(!UtilityFunctions.isNullOrUndefined(result.value)){
          this._systemUsers = result.value;
        }
      }      

    });

    //Whenever the id of the event changes, get the overview of the new event
    this.route.paramMap.switchMap((params: ParamMap) => {

      this.setLoading(true);

      return this.eventService.getEvent(+params.get('eventId'), true);

    }).subscribe((result: HttpResult<Event>) => {

      if(result.isValid){
        
        this._event = result.value;

        if(!UtilityFunctions.isNullOrUndefined(result.value)){

          //Update the navbar title to be the name of the event that was retreived
          this.appBarService.updateTitle(this._event.name);

        }

      }

      else{
        
        //TODO: Figure out what to do in the case of an error
        result.resultMessages.forEach(message => {
          console.log(message.message);  
        })
        
      }

      this.setLoading(false);

    });

  }

  /*
  * Updates the _loading variable of this component to the given value. Passes that value along 
  * to the app bar service so it shows\hides the loader bar.
  */
  private setLoading(val: boolean){
    this._loading = val;
    this.appBarService.updateShowLoader(val);
  }

}
 