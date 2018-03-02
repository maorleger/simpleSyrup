//Angular imports
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

//rxjs imports
import { Observable }    from 'rxjs/Observable';

//Library imports
import { Participant } from '../../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../../lib/utilityFunctions';

@Component({
  selector: 'ssParticipantCard',
  templateUrl: './participantCard.component.html',
  styleUrls: ['./participantCard.component.css']
})
export class ParticipantCardComponent implements OnInit {

  //Indicates if this card is in the expanded state
  expanded: boolean = false;

  //The number of participants to display when this card is in the unexpanded state
  public readonly unExpandedMaxParticipants = 6;

  //Property backing variables
  private _participants: Participant[] = [];
  private _showOverflowButton: boolean;

  /***********************************
  * Properties, Inputs, and Outputs
  ***********************************/

  /*
  * Get the array of participants this component is displaying.
  */
  get participants(): Participant[]{
    return this._participants;
  }

  /*
  * Sets the array of particpants this component is to display.
  */
  @Input()
  set participants(val: Participant[]) {
  
    this._participants = val.filter(participant => participant.status.toLowerCase() !== "declined");

    //Sort the array by status; since the desired order is Attending, Tentative, Invited
    this._participants.sort(function(a, b){

      if (a.user.displayName.toLowerCase() < b.user.displayName.toLowerCase())
        return -1;

      if (a.user.displayName.toLowerCase() > b.user.displayName.toLowerCase())
        return 1;

      return 0;

    });

    //Determine if the overflow button should be shown
    this._showOverflowButton = !UtilityFunctions.isNullOrUndefined(this._participants) && this._participants.length > this.unExpandedMaxParticipants;

  }

  /*
  * Indicates if this card component should show it's empty state. This will be true when the
  * participants array is empty or null.
  */
  get showEmptyState(): boolean{
    return UtilityFunctions.isArrayNullUndefinedOrEmpty(this._participants);
  }

  get showOverflowButton(): boolean{
    return this._showOverflowButton;
  }

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  /****************
  * Public methods
  ****************/

  onExpansionToggled(evt: Event){
    this.expanded = !this.expanded;
  }

  /****************
  * Private methods
  ****************/

  /*
  * Indicates if the given number is divisble by 2.
  */ 
  private isDivisibleByTwo(number: number): boolean{
    return number%2 === 0;
  }

}
