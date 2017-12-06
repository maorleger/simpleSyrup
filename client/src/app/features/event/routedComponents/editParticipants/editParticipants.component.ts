//Angular imports
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { MatDialog } from '@angular/material';

//rxjs imports
import 'rxjs/add/observable/of';
import "rxjs/add/observable/zip";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

//Library imports
import { Participant, User } from '../../../../lib/domain/domain.module';
import { UtilityFunctions } from '../../../../lib/utilityFunctions';
import { Transitions } from '../../../../lib/animations/transitions';

//Service module imports
import { AppBarService, UserService, HttpResult } from '../../../../serviceModule/service.module'

//Ui module imports
import { DialogComponent, DialogResult, DialogService, SnackBarService } from '../../../../uiModule/ui.module'

//Feature imports
import { EventService } from '../../event.service';
import { UserBigChipComponent } from '../../childComponents/userBigChip/userBigChip.component';

import {ENTER} from '@angular/cdk/keycodes';

const COMMA = 188;
const USE_MOCK_DATA = false;

@Component({
  templateUrl: './editParticipants.component.html',
  styleUrls: ['./editParticipants.component.css'],
  animations: [
    Transitions.fadeInOutOnLoad
  ]
})
export class EditParticipantsComponent implements OnInit {

	//Property backing variables
  	private _usersAndParticipants: (User|Participant)[] = []; 
  	private _invitedUsers: User[] = []; 
  	private _loading: boolean = false;
  	private _formState: string = "default";

  	private eventId: number;
	private inviteInput: FormControl = new FormControl();
	private filteredUsersAndParticipants: (User|Participant)[];
	private loadErrorMessage: string;

	@ViewChildren("userBigChip")
	private userBigChipList: QueryList<UserBigChipComponent> = new QueryList<UserBigChipComponent>();

	// Enter, comma
	separatorKeysCodes = [ENTER, COMMA];

	/***********************************
	* Properties, Inputs, and Outputs
	***********************************/

	get invitedUsers(): User[]{
		return this._invitedUsers;
	}

	get formState(): string{
		return this._formState;
	}

	/*
	* Indicates if this component is loading data
	*/
	get loading(): boolean{
		return this._loading;
	}

	get UsersAndParticipants(): (User|Participant)[]{
		return this._usersAndParticipants;
	}

	get showLoadError(): boolean{
		return !UtilityFunctions.isNullUndefinedOrEmpty(this.loadErrorMessage);
	}

	/*
	* Indicates if invite button should be disable. This is true when the user has not selected any users to be invited.
	*/
	get disableInviteButton(): boolean{
		return UtilityFunctions.isNullOrUndefined(this._invitedUsers) || this._invitedUsers.length <= 0;
	}

	constructor(private appBarService: AppBarService, private eventService: EventService, private route: ActivatedRoute, private router: Router, private dialogService: DialogService, private snackBarService: SnackBarService, private userService: UserService) {}

	/****************
	* ng Events
	****************/

	ngOnInit() {

		this.inviteInput.valueChanges.startWith(null).map(val => {
			return val ? this.filter(val) : this._usersAndParticipants.slice()
		}).subscribe(filterVal => {
			this.filteredUsersAndParticipants = filterVal;
		});

		//Whenever the id of the event changes, need to grab several items: the list of event participants, list of system users, and the event name
		this.route.parent.paramMap.switchMap((params: ParamMap) => {

			//Save the event id
			this.eventId = +params.get('eventId');

			//Show the loading bar only if the needed data isn't already ached
			if(UtilityFunctions.isNullOrUndefined(this.eventService.Event) || UtilityFunctions.isNullOrUndefined(this.userService.CachedUsers)){
				this.setLoading(true);
			}

			//Combine the API calls for getting the event participants, system users, and event name
			let _zippedObservable: Observable<{ userResult: HttpResult<User[]>, participantResult: HttpResult<Participant[]>, getNameResult: HttpResult<string> }> = Observable.zip(this.userService.getAllSystemUsers(USE_MOCK_DATA), this.eventService.getEventParticipants(+params.get('eventId'), USE_MOCK_DATA), this.eventService.getEventName(+params.get('eventId'), USE_MOCK_DATA), (userResult, participantResult, getNameResult) => {
				return {userResult: userResult, participantResult: participantResult, getNameResult: getNameResult }
			});

			return _zippedObservable;

		}).subscribe((zippedResults) => {

			//If all the calls were successfull, show the returned data
			if(zippedResults.participantResult.isValid && zippedResults.userResult.isValid && zippedResults.getNameResult.isValid){

				//Add the participants to the array
				if(!UtilityFunctions.isNullOrUndefined(zippedResults.participantResult.value)){
					this._usersAndParticipants = zippedResults.participantResult.value;
				}
				
				//Add the user result to the array; filter out all users that are already participants
				if(!UtilityFunctions.isNullOrUndefined(zippedResults.userResult.value)){

					this._usersAndParticipants = this._usersAndParticipants.concat(zippedResults.userResult.value.filter(user => {
						return !this._usersAndParticipants.find(person => {

							//Need to check both user id fields; either could be used depending on where the data came from
							return +(person as Participant).user.id === user.id || +(person as Participant).userId === user.id;

						});

					}));

				}

				//Sort the retreived users and participants and initialized the filtered array
				this._usersAndParticipants.sort(this.userAndParticipantArraySortByDisplayName);
				this.filteredUsersAndParticipants = this._usersAndParticipants;

				//Update the app bar title to be the name of the event that was retreived
				if(!UtilityFunctions.isNullOrUndefined(zippedResults.getNameResult.value)){
					this.appBarService.updateTitle(zippedResults.getNameResult.value);
				}

			}

			else{

				//At least one of the calls failed; show the load error component
				this.loadErrorMessage = "Oh no! Something went wrong trying to load this page. Try a refresh!";

			}

			this.setLoading(false);
			
		});

	}

	/****************
	* Public methods
	****************/

	/*
	* Adds the given user to the array of invited users. If the given user is alreayd in the invite array,
	* this method does nothing
	*/
	addInvitedUser(userToInvite: User){

    	if(!this._invitedUsers.find(user => user === userToInvite)){
    		this._invitedUsers.push(userToInvite);
    	}

    }

	//TODO: Implement this method
	canDeactivate(): Observable<boolean> | boolean {
    
		//Check for any pending changes. if they exist, ask user what to do and take appropriate action.		
		if(!UtilityFunctions.isNullOrUndefined(this._invitedUsers) && this._invitedUsers.length > 0){
    
			let dialog = this.dialogService.openDialog({ 
				title: "Discard Invites?", 
				message: "You have some invitations waiting to be sent. If you leave without sending them, they will be discarded.",
				affirmativeText: "DISCARD",
				negativeText: "STAY"
			})
    
			return dialog.afterClosed().map(result => {
    
				if(result === DialogResult.Affirmative){
					return true;	
				}
    
				return false;
    
			});
    
		}
    
		return true;

	}

	/*
	* Called when the user clicks on UserBigChip component. The select user is added to the invite array;
	* if the invite button is used later that user will be sent an invite. If the selected user is already
	* flagged for an invite, then they are removed from the invite array.
	*/
	onUserBigChipClicked(userClicked: User){

		//See if the selected user has already been invited
		let index: number = this._invitedUsers.findIndex(user => user === userClicked);

		//If they have, remove them from the invite arary (user has unselected them). Otherwise,
		//add them to the invite array
		if(index >= 0){
			this._invitedUsers.splice(index, 1);
		}
		else{
			this.addInvitedUser(userClicked);
		}

	}

  	add(event: MatChipInputEvent): void {

	    let input = event.input;
	    let value = event.value;

	    if ((value || '').trim()){

	    	this.filteredUsersAndParticipants.forEach(filteredUser => {

				//Get the first user big chip from the filtered list
		    	let bigChip: UserBigChipComponent = this.userBigChipList.find(userBigChip => userBigChip.user === filteredUser);

		    	//User a user chip was found, select it and add the user to the 'invited' array
				if(bigChip){

					bigChip.bigChipComponent.selected = true;
					this.addInvitedUser(bigChip.user);

				}  

			});

	    }

	    //Reset the input value
	    if (input) {
	      input.value = '';
	      this.filteredUsersAndParticipants = this._usersAndParticipants;
	    }

    }

    onInviteButtonClick(evt: Event){

    	var self = this;

    	this.eventService.inviteUsersToEvent(this._invitedUsers, this.eventId).subscribe(inviteResult => {

    		if(inviteResult.isValid){

    			self.eventService.getEventName(this.eventId).subscribe(nameResult => {

    				let message: string;

    				//Build the snack bar notification message. If for some reason the name was not retreived,
    				//provide a generic message
    				if(nameResult.isValid){
				    	message = "Invites sent for " + nameResult.value + '!';
    				}

    				else{
    					message = "Invites sent!"
    				}

    				//Clear out the invited users, give the snack bar alert and route back to the overview page
			    	self._invitedUsers = [];
			    	self.snackBarService.openSnackBar(message);
			    	self.router.navigate(['../'], { relativeTo: self.route });

    			});

    		}

    		else{
    			self._invitedUsers = [];
    			self.snackBarService.openSnackBar("Oh no, something went wrong! Try that again.");
    		}

    	});

    }

    onUserChipRemoveButtonClick(user: User){

    	this._invitedUsers.splice(this._invitedUsers.findIndex(x => x === user), 1);

    	let bigChip: UserBigChipComponent = this.userBigChipList.find(userBigChip => userBigChip.user === user);

		if(bigChip){
			bigChip.bigChipComponent.selected = false;
		}    	

    }

    isUserObject(object: object){
    	return object instanceof User;
    }

    isParticipantObject(object: object){
    	return object instanceof Participant;
    }

    /*
    * Indicates if the given user is flagged for invitation.
    */
	isUserInvited(user: User): boolean{
    	return this._invitedUsers.findIndex(x => x === user) >= 0;
    }

	/****************
	* Private methods
	****************/

	private showParticipantSection(particiants: Participant[]): boolean{
		return !UtilityFunctions.isNullOrUndefined(particiants) && particiants.length > 0;
	}

	private filter(val: string): (User|Participant)[] {

      return this._usersAndParticipants.filter(option => {

      	let user: User;

      	if(option instanceof User){
      		user = option;
      		
      	}

      	else if(option instanceof Participant){
      		user = option.user;
      	}

      	else{
      		throw new Error("Unexpected object type in _usersAndParticipants");
      	}

      	return user.displayName.toLowerCase().indexOf(val.toLowerCase()) === 0;

      });
	
   }

   	/*
   	* Updates the _loading variable of this component to the given value. Passes that value along 
   	* to the app bar service so it shows\hides the loader bar.
   	*/
	private setLoading(val: boolean){
		
		this._loading = val;

		if(this._loading){
			this._formState = "loading";
		}

		else{
			this._formState = "loaded";
		}

		this.appBarService.updateShowLoader(val);
	}

   	private userAndParticipantArraySortByDisplayName(a, b){

		let userA: User;
		let userB: User;

		if(a instanceof User){
			userA = a;
		}
		else{
			userA = (a as Participant).user;
		}

		if(b instanceof User){
			userB = b;
		}
		else{
			userB = (b as Participant).user;
		}

		if (userA.displayName < userB.displayName)
			return -1;

		if (userA.displayName > userB.displayName)
			return 1;

		return 0;
	}

}
