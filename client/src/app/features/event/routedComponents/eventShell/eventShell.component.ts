//Angular imports
import { Component, OnInit } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';

import { Transitions } from '../../../../lib/animations/transitions';

@Component({
  templateUrl: './eventShell.component.html',
  styleUrls: ['./eventShell.component.css'],
  animations: [
    trigger('routerAnimations', [
      transition('overview => eventSubPage', Transitions.slideRight),
      transition('eventSubPage => overview', Transitions.slideLeft),
    ])
  ]
})
export class EventShellComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	prepareRouteTransition(outlet) {
	    const animation = outlet.activatedRouteData['animation'] || {};
	    return animation['value'] || null;
	}

}
 