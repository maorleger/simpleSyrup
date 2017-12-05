//Angular imports
import { transition, trigger, animate, style } from '@angular/core';

/** Note: not ideal that was are using animation stuff from both @angular/core and @angular/animations. This is the result of combing angular 2\4 patterns. Works for now; consider changing in the future. **/
import { trigger as animationTrigger, state, style as animationStyle, animate as animationAnimate, transition as animationTransition, group, query } from '@angular/animations';

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

  static slideLeft = [
    query(':leave', animationStyle({ position: 'absolute', left: 0, right: 0 ,transform: 'translate3d(0%,0,0)' }), {optional:true}),
    query(':enter', animationStyle({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' }), {optional:true}),
    group([
      query(':leave', group([
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
      ]), {optional:true}),
      query(':enter', group([
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(0%,0,0)' })),
      ]), {optional:true})
    ])
  ]

  static slideRight = [
    query(':leave', animationStyle({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0%,0,0)'}), {optional:true}),
    query(':enter', animationStyle({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)'}), {optional:true}),

    group([
      query(':leave', group([
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
      ]), {optional:true}),
      query(':enter', group([
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(0%,0,0)' })),
      ]), {optional:true})
    ])
  ]

}
