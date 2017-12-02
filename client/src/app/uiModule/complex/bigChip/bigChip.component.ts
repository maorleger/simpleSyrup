import { animate, Component, EventEmitter, Input, OnInit, Output, trigger, state, style, transition } from '@angular/core';

//Library imports
import { UtilityFunctions } from '../../../lib/utilityFunctions';

@Component({
  selector: 'ssBigChip',
  templateUrl: './bigChip.component.html',
  styleUrls: ['./bigChip.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('250ms ease-in-out')),
      transition('inactive => active', animate('250ms ease-in-out'))
    ])  
  ]
})
export class BigChipComponent implements OnInit {

  flip: string = 'inactive';

  //Property backing variables
  private _showPicture: boolean;
  private _infoText: string;
  private _pictureUrl: string;
  private _pictureReplacementChars: string;
  private _selected: boolean = false;

  /***********************************
  * Properties, Inputs, and Outputs
  ***********************************/

  @Output()
  bigChipClicked: EventEmitter<Event> = new EventEmitter<Event>();

  @Input()
  selectable: boolean = false;

  get infoText(): string{
    return this._infoText;
  }

  @Input()
  set infoText(val: string) {

    this._infoText = val;
    
  }

  get pictureUrl(): string{
    return this._pictureUrl;
  }

  @Input()
  set pictureUrl(val: string) {

    this._pictureUrl = val;
    this._showPicture = !UtilityFunctions.isNullUndefinedOrEmpty(val);
    
  }

  get pictureReplacementChars(): string{
  	return this._pictureReplacementChars;
  }

  @Input()
  set pictureReplacementChars(val: string){
  	this._pictureReplacementChars = val;
  }

  get selected(): boolean{
    return this._selected;
  }

  @Input()
  set selected(val: boolean){
    this._selected = val;

    if(!this._selected){
      this.flip = 'inactive';
    }
    else{
      this.flip = 'active';
    }

  }

  /*
  * Indicates if the profile picture for this participant should be shown. If false,
  * initials are shown instead.
  */
  get showPicture(): boolean{
    return this._showPicture;
  }

  constructor() {  }

  /****************
  * ng Events
  ****************/

  ngOnInit() {
  }

  /****************
  * Public methods
  ****************/

  onBigChipClicked(event: Event){

    if(this.selectable){

      this.toggleFlip();
      this.selected = !this.selected;

      this.bigChipClicked.emit(event);

    }

  }

  /****************
  * Private methods
  ****************/

  private  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}
