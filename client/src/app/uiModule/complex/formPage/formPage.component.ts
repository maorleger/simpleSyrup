//Anguular imports
import { Component, Input, OnInit } from '@angular/core';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';

@Component({
  selector: 'ssFormPage',
  templateUrl: './formPage.component.html',
  styleUrls: ['./formPage.component.scss']
})

export class FormPageComponent implements OnInit {

	private _title: string = null;

	/***********************************
	* Properties, Inputs, and Outputs
	***********************************/

	get showTitle(): boolean{
		return !UtilityFunctions.isNullUndefinedOrEmpty(this._title);
	}

	get title(): string{
		return this._title;
	}

	@Input()
	set title(val: string){
		this._title = val;
	}

	/***********
    * ng Events
    ************/

	ngOnInit() { }


}