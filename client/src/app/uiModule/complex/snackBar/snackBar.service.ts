//Angular imports
import { Injectable } from '@angular/core';

//Material Design imports 
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

//UI module imports
import { SnackBarComponent } from './snackBar.component';

/*
* This service is a bit special because it lives in UiModule instead of ServiceModule. This had to be done because 
* it opens a snackbar from the SnackBarComponent. This can't be done in the service module, so the service lives here.
*/
@Injectable()
export class SnackBarService{

	constructor(public snackBar: MatSnackBar) {}

	public openSnackBar(message: string, action?: string){

		let horizontalPosition: MatSnackBarHorizontalPosition = 'right';
		let verticalPosition: MatSnackBarVerticalPosition = 'bottom';

		this.snackBar.openFromComponent(SnackBarComponent, {
			duration: 5000,
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			extraClasses: ["success"],
			data: {
				message: message,
				action: action
			}
		});

	}

}