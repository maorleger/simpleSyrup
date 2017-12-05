//Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

//Library imports
import { UtilityFunctions } from '../../../../lib/utilityFunctions';
import { Event, Participant } from '../../../../lib/domain/domain.module';

//Feature imports
import { EventService } from '../../event.service';

//Service module imports
import { HttpResult, AppBarService, UserService } from '../../../../serviceModule/service.module'

//Local component imports
import { ParticipantCardComponent } from '../../childComponents/participantCard/participantCard.component'

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  //Property backing variables
  private _event: Event;

  /*
  * Event this component is displaying
  */
  get event(): Event{
    return this._event;
  }

  /*
  * Participants of the event this component is displaying
  */ 
  get eventParticipants(): Participant[]{
    return UtilityFunctions.isNullOrUndefined(this.event) ? null : this.event.participants;
  }

  constructor(private eventService: EventService, private appBarService: AppBarService, private route: ActivatedRoute, private userService: UserService) { }

  /****************
  * ng Events
  ****************/

  ngOnInit() {

    this.userService.getAllSystemUsers().subscribe();

    //Whenever the id of the event changes, get the overview of the new event
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.eventService.getEvent(+params.get('eventId'));
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

    });

  }

}
 