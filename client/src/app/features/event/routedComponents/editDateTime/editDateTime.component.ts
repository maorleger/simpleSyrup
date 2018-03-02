//Angular imports
import { Component, Injector } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

//Library imports
import { Participant } from '../../../../lib/domain/domain.module';
import { Transitions } from '../../../../lib/animations/transitions';

//Feature imports
import { EventSubPageComponent } from '../../eventSubPage/eventSubPage.component';

//Service module imports
import { UserService } from '../../../../serviceModule/service.module'

//Ui module imports
import { DialogService, SnackBarService } from '../../../../uiModule/ui.module'

const USE_MOCK_DATA = true;

@Component({
  templateUrl: './editDateTime.component.html',
  styleUrls: ['./editDateTime.component.scss'],
  animations: [
    Transitions.fadeInOutOnLoad
  ]
})
export class EditDateTimeComponent extends EventSubPageComponent{  

	public submittedBy: Participant = new Participant;

	constructor(injector: Injector, private router: Router, private dialogService: DialogService, private snackBarService: SnackBarService, private userService: UserService) {
		super(injector);
	}

	ngOnInit(){

		// super.ngOnInit();

		// this.route.parent.paramMap.switchMap((params: ParamMap) => {
		// 	this.eventService.getEventParticipants(+params.get('eventId'), USE_MOCK_DATA)
		// }).subscribe((zippedResults) => {
		// });

	}
}