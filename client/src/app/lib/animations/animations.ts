import { animate, style } from '@angular/core';

export class Animations {

	//Property backing variables
	private static _durationShort = 150;

	static durationShort = Animations._durationShort;

	static animateToAutoHeight = animate(Animations.durationShort + 'ms ease-in-out', style({height: '*'}));

	static animateToZeroHeight = animate(Animations.durationShort + 'ms ease-in-out', style({height: 0}));
	
}