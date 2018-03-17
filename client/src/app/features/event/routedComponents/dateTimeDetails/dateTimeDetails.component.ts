//Angular imports
import { Component, Injector } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

//Library imports
import { User } from '../../../../lib/domain/domain.module';
import { Transitions } from '../../../../lib/animations/transitions';

//Feature imports
import { EventSubPageComponent } from '../../eventSubPage/eventSubPage.component';

//Service module imports
import { UserService } from '../../../../serviceModule/service.module'

//Ui module imports
import { DialogService, SnackBarService } from '../../../../uiModule/ui.module'

const USE_MOCK_DATA = true;

@Component({
  templateUrl: './dateTimeDetails.component.html',
  styleUrls: ['./dateTimeDetails.component.scss'],
  animations: [
    Transitions.fadeInOutOnLoad
  ]
})
export class DateTimeDetailsComponent extends EventSubPageComponent{  

	//TEST DATA

	public submittedBy: User = new User;
	public acceptedUsers: User[] = [];
	public declinedUsers: User[] = [];

	//END TEST DATE

	constructor(injector: Injector, private router: Router, private dialogService: DialogService, private snackBarService: SnackBarService, private userService: UserService) {
		super(injector);

		this.submittedBy = this.eventService.mockParticipantData[0].user;

		for (let counter = 0; counter < 5; counter++) { 
			this.acceptedUsers.push(this.eventService.mockParticipantData[counter].user);
			this.declinedUsers.push(this.eventService.mockParticipantData[counter].user);
		}

	}

	ngOnInit(){

		// super.ngOnInit();

		// this.route.parent.paramMap.switchMap((params: ParamMap) => {
		// 	this.eventService.getEventParticipants(+params.get('eventId'), USE_MOCK_DATA)
		// }).subscribe((zippedResults) => {
		// });

	}
}