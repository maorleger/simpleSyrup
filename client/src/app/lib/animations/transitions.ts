//Angular imports
import { transition, trigger, style, animate } from '@angular/core';

//Local folder imports
import { Animations } from './animations';

export class Transitions {

	static expandInCollapseOut = trigger('expandInCollapseOut', [
      transition('* => void', [
        style({height: '*'}),
        Animations.animateToZeroHeight
      ]),
      transition('void => *', [
        style({height: '0'}),
        Animations.animateToAutoHeight
      ])
	]);

}
