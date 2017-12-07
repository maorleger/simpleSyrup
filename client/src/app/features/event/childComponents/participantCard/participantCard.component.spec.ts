//angular imports
import { Router } from '@angular/router';

//rxjs imports
import { Observable } from 'rxjs/Observable';

//Library imports
import { Participant } from '../../../../lib/domain/domain.module';

//Local folder imports
import { ParticipantCardComponent } from './participantCard.component';

describe('ParticipantCardComponent', () => {

	let testComponent: ParticipantCardComponent;

	const routerStub = {
	    navigate(commands: any[], extras?: any): any { throw Error(); },
	};
  
	beforeEach(() => {
		testComponent = new ParticipantCardComponent(routerStub as Router, null);    
	});

	it('showEmptyState property is calculated correctly', () => {

		let participant: Participant = new Participant();
		testComponent.participants = [participant];

		expect(testComponent.showEmptyState).toBeFalsy();

		testComponent.participants = [];
		expect(testComponent.showEmptyState).toBeTruthy();

		testComponent.participants = undefined;
		expect(testComponent.showEmptyState).toBeTruthy();

	});

	it('showOverflowButton property is calculated properly', () => {

		let participants: Participant[] = [];

		//Add the max number of participants before overflow needs to be shown
		for (let counter = 0; counter < testComponent.unExpandedMaxParticipants; counter++) { 
		    participants.push(new Participant());
		}		
		testComponent.participants = participants;

		expect(testComponent.showOverflowButton).toBeFalsy();

		//Add one more participant that will have to be in the overflow section
		participants.push(new Participant());
		testComponent.participants = participants;

		expect(testComponent.showOverflowButton).toBeTruthy();

	});

});
