//Anguular imports
import { Component, Inject, OnInit } from '@angular/core';

//Material design imports
import {MAT_SNACK_BAR_DATA} from '@angular/material';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';

@Component({
  selector: 'ssSnackBar',
  templateUrl: 'snackBar.component.html',
  styles: ['snackBar.component.scss'],
})
export class SnackBarComponent {

	get showActionButton(): boolean{
		return !UtilityFunctions.isNullOrUndefined(this.data) && !UtilityFunctions.isArrayNullUndefinedOrEmpty(this.data.action);
	}

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any){

	}

}
