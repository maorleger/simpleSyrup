//Angular imports
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';

//Local folder imports
import { DialogResult } from './dialogResult';

@Component({
  selector: 'ssDialogComponent',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	//Expose the DialogResult class to the html template
	private dialogResult = DialogResult;

	get showTitle(): boolean{
		return !UtilityFunctions.isNullOrUndefined(this.data) && !UtilityFunctions.isArrayNullUndefinedOrEmpty(this.data.title);
	}

	get showMessage(): boolean{
		return !UtilityFunctions.isNullOrUndefined(this.data) && !UtilityFunctions.isArrayNullUndefinedOrEmpty(this.data.message);
	}

	get showAffirmativeButton(): boolean{
		return !UtilityFunctions.isNullOrUndefined(this.data) && !UtilityFunctions.isArrayNullUndefinedOrEmpty(this.data.affirmativeText);
	}

	get showNegativeButton(): boolean{
		return !UtilityFunctions.isNullOrUndefined(this.data) && !UtilityFunctions.isArrayNullUndefinedOrEmpty(this.data.negativeText);
	}

	get showOkButton(): boolean{
		return !this.showAffirmativeButton && !this.showNegativeButton;
	}

	constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
	
}