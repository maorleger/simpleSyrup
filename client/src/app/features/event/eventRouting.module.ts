//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Feature imports
import { CanDeactivateGuard }    from '../canDeactivateGuard.service';

//Local imports
import { OverviewComponent } from './routedComponents/overview/overview.component';
import { EventShellComponent } from './routedComponents/eventShell/eventShell.component';
import { EditParticipantsComponent } from './routedComponents/editParticipants/editParticipants.component';

const eventRoutes: Routes = [
  {
    path: '',
    component: EventShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewComponent
      },
      {
        path: 'EditParticipants',
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        component: EditParticipantsComponent
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
