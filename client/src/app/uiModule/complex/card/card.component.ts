//Anguular imports
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';
import { Transitions } from '../../../lib/animations/transitions';

@Component({
  selector: 'ssCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [ Transitions.expandInCollapseOut ]
})

export class CardComponent implements OnInit {

	

	//Property backing variables
    private _icon: string;
    private _addButtonRouterLink: string;
    private _showOverflowButton: boolean;
	private _title: string;
	private _expanded: boolean = false;

    /***********************************
    * Properties, Inputs, and Outputs
    ***********************************/

    /*
    * Event that is emitted when the add button (the plus icon) is clicked.
    */
    @Output()
    addButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    expansionToggled: EventEmitter<Event> = new EventEmitter<Event>();
    
    /*
    * URL the add button leads too when clicked
    */
    @Input()
    addLink: string = "#";

    /*
    * Indicates if the icon in the title of this card should be displayed or not. This is true if an
    * icon was passed to this card. Otherwise, if no icon was passed, or an empty string was passed,
    * this will be false.
    */
    get displayTitleIcon(): boolean{
        return !UtilityFunctions.isNullUndefinedOrEmpty(this._icon);
    }

    /*
    * Indicates if this card is expanded
    */
    get expanded(): boolean{
        return this._expanded;
    }

    /*
    * Sets the icon that will appear in the ttle of this card. Must be a valid material design icon.
    */
    @Input()
    set icon(val: string) {
        this._icon = val;
    }

    /*
    * Gets the icon that will appear in the ttle of this card. Must be a valid material design icon.
    */
    get icon(): string{
        return this._icon;
    }

    /*
    * Sets the flag that indicates if the overflow button will be shown.
    */
    @Input()
    set showOverflowButton(val: boolean){
        this._showOverflowButton = val;
    }

    /*
    * Get the flag that indicates if the overflow button will be shown.
    */
    get showOverflowButton(): boolean{
        return this._showOverflowButton;
    }

    /*
    * Sets the title that will appear in the header of this card.
    */
    @Input()
    set title(val: string) {
        this._title = val;
    }

    /*
    * Get the title that appears in the header of this card.
    */
    get title(): string{
        return this._title;
    }

	constructor() { }

    /***********
    * ng Events
    ************/

	ngOnInit() { }

    /****************
    * Public methods
    ****************/

    /*
    * Event handler for when the add button (plus icon) is clicked.
    * Emits the 'addButtonClicked' event.
    */
    onAddButtonClicked(evt: Event){
        this.addButtonClicked.emit(evt);
    }

    /*
    *  Event handler for when expansion button is clicked. Toggles
    *  the expansion flag and emits the 'expansionToggled' event.
    */
	onExpansionToggled(evt: Event){
		this._expanded = !this._expanded;
        this.expansionToggled.emit(evt);
	}

}
