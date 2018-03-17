//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Feature imports
import { CanDeactivateGuard }    from '../canDeactivateGuard.service';

//Local imports
import { OverviewComponent } from './routedComponents/overview/overview.component';
import { EventShellComponent } from './routedComponents/eventShell/eventShell.component';
import { DateTimeDetailsComponent } from './routedComponents/dateTimeDetails/dateTimeDetails.component';
import { EditDateTimeComponent } from './routedComponents/editDateTime/editDateTime.component';
import { EditParticipantsComponent } from './routedComponents/editParticipants/editParticipants.component';

const eventRoutes: Routes = [
  {
    path: '',
    component: EventShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewComponent,
        data: {
          animation: {
            value: 'overview',
          }
        }
      },
      {
        path: 'DateTimeDetails',
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        component: DateTimeDetailsComponent,
        data: {
          animation: {
            value: 'eventSubPage',
          }
        }
      },
      {
        path: 'EditParticipants',
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        component: EditParticipantsComponent,
        data: {
          animation: {
            value: 'eventSubPage',
          }
        }
      },
      {
        path: 'EditDateTime',
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        component: EditDateTimeComponent,
        data: {
          animation: {
            value: 'eventSubPage',
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(eventRoutes)
  ],
  exports: [
    RouterModule
  ],  
  providers: [
    CanDeactivateGuard
  ]
})

export class EventRoutingModule { }
