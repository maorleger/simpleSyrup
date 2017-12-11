import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Library imports
import { Participant } from '../../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../../lib/utilityFunctions';

@Component({
  selector: 'ssParticipantBigChip',
  templateUrl: './participantBigChip.component.html',
  styleUrls: ['./participantBigChip.component.scss']
})
export class ParticipantBigChipComponent implements OnInit {

  //Property backing variables
  private _participant: Participant;
  
  /***********************************
  * Properties, Inputs, and Outputs
  ***********************************/

  /*
  * Event that is emitted when the picture this component is displaying is done loading.
  */
  @Output()
  pictureLoaded: EventEmitter<string> = new EventEmitter<string>();

  
  /*
  * Indicates if this component is selected. If so, a check box icon appears in place
  * of the profile\initials picture.
  */
  @Input()
  selected: boolean = false;

  /*
  * The participant this component displays
  */
  get participant(): Participant{
    return this._participant;
  }

  /*
  *  Sets the participant this component is to display. Throws an error if
  *  the given object is null. 
  */
  @Input()
  set participant(val: Participant) {

    if(UtilityFunctions.isNullOrUndefined(val)){
      throw new Error("Cannot pass null participant to ParticipantComponent.");
    }

    this._participant = val;
    
  }

  get status(): string{
    return this._participant.status.charAt(0).toUpperCase() + this._participant.status.slice(1);
  }

  /*
  * Name of the css class that represents the status of the participant for this component.
  */
  get statusClass(): string{

    //If the status exists, use it as the class name (need to make it lower case though)
    if(!UtilityFunctions.isNullUndefinedOrEmpty(this._participant.status)){
      return this._participant.status.toString().toLowerCase();
    }

    return null;

  }

  constructor() {  }

  /****************
  * ng Events
  ****************/

  ngOnInit() {}

  /****************
  * Public methods
  ****************/

  onPictureLoad(event: string){
    this.pictureLoaded.emit(event);
  }

  /****************
  * Private methods
  ****************/


}
