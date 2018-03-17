//MAGIC FIX! This import is needed to fix Unexpected value XXXX declared by the module YYYY. Don't know why it works but it does so don't remove.
import "reflect-metadata";

//Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


//UI Module Imports
import { UiModule } from '../../uiModule/ui.module';
import { MaterialDesignModule } from '../../uiModule/materialDesign.module';

//Service module imports
import { ServiceModule } from '../../serviceModule/service.module'

//Routed component imports
import { OverviewComponent } from './routedComponents/overview/overview.component'
import { EventShellComponent } from './routedComponents/eventShell/eventShell.component'
import { EditDateTimeComponent } from './routedComponents/editDateTime/editDateTime.component'
import { DateTimeDetailsComponent } from './routedComponents/dateTimeDetails/dateTimeDetails.component'
import { EditParticipantsComponent } from './routedComponents/editParticipants/editParticipants.component'

//Child component imports
import { DateTimeCardComponent } from './childComponents/dateTimeCard/dateTimeCard.component'
import { ParticipantBigChipComponent } from './childComponents/participantBigChip/participantBigChip.component'
import { ParticipantCardComponent } from './childComponents/participantCard/participantCard.component'
import { UserBigChipComponent } from './childComponents/userBigChip/userBigChip.component'
import { UserChipComponent } from './childComponents/userChip/userChip.component'

//Local imports
import { EventService } from './event.service';
import { EventRoutingModule } from './eventRouting.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        EventRoutingModule,
        MaterialDesignModule,
        ServiceModule
    ],
    providers: [
        EventService
    ],
    declarations: [
        DateTimeCardComponent,
        DateTimeDetailsComponent,
        EditDateTimeComponent,
    	EditParticipantsComponent,
    	EventShellComponent,
    	OverviewComponent,
    	ParticipantBigChipComponent,
    	ParticipantCardComponent,
        UserBigChipComponent,
        UserChipComponent
	]
})
export class EventModule { }