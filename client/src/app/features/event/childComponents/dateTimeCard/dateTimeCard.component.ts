import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssDateTimeCard',
  templateUrl: './dateTimeCard.component.html',
  styleUrls: ['./dateTimeCard.component.scss']
})
export class DateTimeCardComponent implements OnInit {

  /***********************************
  * Properties, Inputs, and Outputs
  ***********************************/

  get eventHasOfficalDate(): boolean{
    return false;
  }

  /*
  * Indicates if this card component should show it's empty state. This will be true when no times
  * have been suggested for the event.
  */
  get showEmptyState(): boolean{

    //TOOD: Implement this for realsies
    return false;

  }

  constructor() { }

  ngOnInit() {
  }

}
