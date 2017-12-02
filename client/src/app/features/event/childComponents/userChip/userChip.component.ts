//Angular imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Library imports
import { User } from '../../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../../lib/utilityFunctions';

@Component({
  selector: 'ssUserChip',
  templateUrl: './userChip.component.html',
  styleUrls: ['./userChip.component.scss']
})
export class UserChipComponent implements OnInit{

	//Property backing variables
	private _user: User;

	/***********************************
	* Properties, Inputs, and Outputs
	***********************************/

	@Output()
	removeButtonClicked: EventEmitter<User> = new EventEmitter<User>();

	get user(): User{
		return this._user;
	}

	@Input()
	set user(val: User){

		if(UtilityFunctions.isNullOrUndefined(val)){
		  throw new Error("Cannot pass null user to userChipComponent.");
		}

		this._user = val;
	}

	/****************
	* ng Events
	****************/

	ngOnInit() {}

	/****************
	* Public methods
	****************/

	onRemoveButtonClicked(event: Event){
		this.removeButtonClicked.emit(this.user);
	}

}