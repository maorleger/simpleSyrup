//Angular imports
import { Component, OnInit } from '@angular/core';

//Rxjs imports
import { Subscription } from 'rxjs/Subscription';

//Service module imports
import { AppBarService } from '../../serviceModule/service.module';

//Library imports
import { Transitions } from '../../lib/animations/transitions';

@Component({
  selector: 'ssAppBar',
  templateUrl: './appBar.component.html',
  styleUrls: ['./appBar.component.scss'],
  animations: [
    Transitions.fadeInOut
  ]
})
export class AppBarComponent implements OnInit {

	private navbarTitleUpdateSubscription: Subscription;
	private showLoaderUpdateSubscription: Subscription;

	//property backing variables
	private _title: string;
	private _showMenuButton: boolean = true;
	private _showLoader: boolean = false;


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

	get showLoader(): boolean{
		return this._showLoader;
	}

	constructor(private navbarService: AppBarService) { }

	/****************
	* ng Events
	****************/
	ngOnInit() {

		this.navbarTitleUpdateSubscription = this.navbarService.titleSource.subscribe((title: string) => {
			this._title = title;
		});

		this.showLoaderUpdateSubscription  = this.navbarService.showLoaderSource.subscribe((showLoader: boolean) => {
			this._showLoader = showLoader;
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
