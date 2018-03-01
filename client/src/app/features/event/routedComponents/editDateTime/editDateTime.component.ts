//Angular imports
import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

//Library imports
import { Transitions } from '../../../../lib/animations/transitions';

//Feature imports
import { EventSubPageComponent } from '../../eventSubPage/eventSubPage.component';

//Service module imports
import { UserService } from '../../../../serviceModule/service.module'

//Ui module imports
import { DialogService, SnackBarService } from '../../../../uiModule/ui.module'

@Component({
  templateUrl: './editDateTime.component.html',
  styleUrls: ['./editDateTime.component.scss'],
  animations: [
    Transitions.fadeInOutOnLoad
  ]
})
export class EditDateTimeComponent extends EventSubPageComponent{  

	constructor(injector: Injector, private router: Router, private dialogService: DialogService, private snackBarService: SnackBarService, private userService: UserService) {
		super(injector);
	}
}