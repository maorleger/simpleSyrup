import { animate, style } from '@angular/core';

export class Animations {

	//Property backing variables
	static durationShort = 150;
	static durationMedium = 300;

	static animateToAutoHeight = animate(Animations.durationShort + 'ms ease-in-out', style({height: '*'}));

	static animateToZeroHeight = animate(Animations.durationShort + 'ms ease-in-out', style({height: 0}));

	static animateToFullOpacity = animate(Animations.durationShort, style({ opacity: 1 }));

	static animateToZeroOpacity = animate(Animations.durationShort, style({ opacity: 0 }));
	
}