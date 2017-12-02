//Angular imports
import { Injectable } from '@angular/core';

//Material design imports
import { MatDialogRef, MatDialog } from '@angular/material';

//UI module imports
import { DialogComponent } from './dialog.component';

/*
* This service is a bit special because it lives in UiModule instead of ServiceModule. This had to be done because 
* it opens a snackbar from the SnackBarComponent. This can't be done in the service module, so the service lives here.
*/
@Injectable()
export class DialogService{

	constructor(private dialog: MatDialog) {}

	public openDialog(data: any): MatDialogRef<DialogComponent>{

		//Top: 56px to account for the app bar, and 12% down the remaining space
		return this.dialog.open(DialogComponent, {
			position: {
				top: window.innerHeight * 0.12 + 56 + "px"
			},
			data: data
		});

	}

}