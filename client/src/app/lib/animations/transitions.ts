//Angular imports
import { AnimationEntryMetadata, transition, trigger, animate, state, style } from '@angular/core';

/** Note: not ideal that was are using animation stuff from both @angular/core and @angular/animations. This is the result of combing angular 2\4 patterns. Works for now; consider changing in the future. **/
import { AnimationQueryMetadata, AnimationGroupMetadata, trigger as animationTrigger, state as animationState, style as animationStyle, animate as animationAnimate, transition as animationTransition, group, query } from '@angular/animations';

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

  /*
  * Transition for fading in\out when an object enters or leaves.
  */
  static fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({ opacity: 0 }),
      Animations.animateToFullOpacity
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      Animations.animateToZeroOpacity
    ])
  ])

  /*
  * Transition for an object to fade in\out, but with more fine control than fadeInOut.
  * This one is based on loading states, which allows the object to only fade in\out 
  * in certain conditions, and not have any animation in others.
  */
  static fadeInOutOnLoad = trigger('fadeInOutOnLoad', [
      state('loading' , style({ opacity: 0 })),
      state('loaded', style({ opacity: 1 })),
      state('default', style({ opacity: 1 })),
      transition('loading => loaded', animate(Animations.durationShort)),
      transition('loaded => loading', animate(Animations.durationShort))
  ])

  static slideLeft: (AnimationQueryMetadata | AnimationGroupMetadata)[] = [
    query(':leave', animationStyle({ position: 'absolute', left: 0, right: 0 ,transform: 'translate3d(0%,0,0)' }), {optional:true}),
    query(':enter', animationStyle({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' }), {optional:true}),
    group([
      query(':leave', [
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
      ], {optional:true}),
      query(':enter', [
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(0%,0,0)' })),
      ], {optional:true})
    ])
  ]

  static slideRight: (AnimationQueryMetadata | AnimationGroupMetadata)[]  = [
    query(':leave', animationStyle({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0%,0,0)'}), {optional:true}),
    query(':enter', animationStyle({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)'}), {optional:true}),

    group([
      query(':leave', [
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
      ], {optional:true}),
      query(':enter', [
        animationAnimate('300ms cubic-bezier(.35,0,.25,1)', animationStyle({ transform: 'translate3d(0%,0,0)' })),
      ], {optional:true})
    ])
  ]

}
