//Angular imports
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

//Ui Module imports
import { BigChipComponent } from "../../../../uiModule/ui.module"

//Library imports
import { User } from '../../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../../lib/utilityFunctions';

@Component({
  selector: 'ssUserBigChip',
  templateUrl: './userBigChip.component.html',
  styleUrls: ['./userBigChip.component.scss']
})
export class UserBigChipComponent implements OnInit{

	//Property backing variables
	private _user: User;

	@ViewChild('ssBigChip')
	private _bigChipComponent: BigChipComponent;

	/***********************************
	* Properties, Inputs, and Outputs
	***********************************/

	/*
	* Event that is emitted when any part of this component is clicked.
	*/
  	@Output()
  	userBigChipClicked: EventEmitter<User> = new EventEmitter<User>();

  	/*
  	* Indicates if this component is selected. If so, a check box icon appears in place
  	* of the profile\initials picture.
  	*/
	@Input()
	selected: boolean = false;

	/*
	* The user this component displays
	*/
	get user(): User{
		return this._user;
	}

	/*
	*  Sets the user this component is to display. Throws an error if
	*  the given object is null. 
	*/
	@Input()
	set user(val: User) {

		if(UtilityFunctions.isNullOrUndefined(val)){
		  throw new Error("Cannot pass null user to userBigChipComponent.");
		}

		this._user = val;
	
	}

	get bigChipComponent(): BigChipComponent{
		return this._bigChipComponent;
	}

	/****************
	* ng Events
	****************/

	ngOnInit() {}

	  /****************
	  * Public methods
	  ****************/

	  onUserBigChipClick(event: Event){
	    this.userBigChipClicked.emit(this._user);
	  }

	  /****************
	  * Private methods
	  ****************/

}