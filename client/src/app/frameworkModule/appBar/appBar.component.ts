//Angular imports
import { Component, OnInit } from '@angular/core';

//Rxjs imports
import { Subscription } from 'rxjs/Subscription';

//Service module imports
import { AppBarService } from '../../serviceModule/service.module';

@Component({
  selector: 'ssAppBar',
  templateUrl: './appBar.component.html',
  styleUrls: ['./appBar.component.scss']
})
export class AppBarComponent implements OnInit {

	private _title: string;
	private navbarTitleUpdateSubscription: Subscription;

	//property backing variables
	private _showMenuButton: boolean = true;

	/************
	* Properties
	*************/

	//Indicates if the hamburger menu button should be displayed. If false, a left arrow is displayed
	get showMenuButton(): boolean{
		return this._showMenuButton;
	}

	get title(): string{
		return this._title;
	}

	constructor(private navbarService: AppBarService) { }
	// constructor() { }

	/****************
	* ng Events
	****************/
	ngOnInit() {

		this.navbarTitleUpdateSubscription = this.navbarService.titleSource.subscribe((title: string) => {
			this._title = title;
		});

	}

	ngOnDestroy(){
		this.navbarTitleUpdateSubscription.unsubscribe();
	}

	/****************
	* Event handlers
	****************/
	onMenuButtonClick(evt: Event){
		this._showMenuButton = !this._showMenuButton;
	}

}
