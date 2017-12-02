//Angular imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';

@Component({
  selector: 'ssChip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit{

	//Property backing variables
	private _displayText: string;
	private _photoUrl: string;
	private _showPicture: boolean;
	private _removable: boolean = false;
	
	/***********************************
	* Properties, Inputs, and Outputs
	***********************************/

	@Output()
	removeButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

	get removable(): boolean{
		return this._removable;
	}

	@Input()
	set removable(val: boolean){
		this._removable = val;
	}

	get displayText(): string{
		return this._displayText;
	}

	@Input()
	set displayText(val: string) {
		this._displayText = val;	
	}

	get photoUrl(): string{
		return this._photoUrl;
	}

	@Input()
	set photoUrl(val: string) {

		this._photoUrl = val;	

		//If the url given is not whitespace, show the picture
		this._showPicture = !UtilityFunctions.isNullUndefinedOrEmpty(val);

	}

	get showPicture(): boolean{
		return this._showPicture;
	}

	/****************
	* ng Events
	****************/

	ngOnInit() {}

	/****************
	* Public methods
	****************/

	onRemoveButtonClicked(event: Event){
		this.removeButtonClicked.emit(event);
	}

}