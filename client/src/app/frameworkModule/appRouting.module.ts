//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Local imports
import { SelectivePreloadingStrategy } from './selectivePreloadStrategy';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

const appRoutes: Routes = [
  {
    path: 'events/:eventId',
    loadChildren: '../features/event/event.module#EventModule',
    data: { preload: false }
  },
  { path: '',   redirectTo: '/events/1', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
		  appRoutes,
  		{
  			preloadingStrategy: SelectivePreloadingStrategy,
  		}
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})

export class AppRoutingModule { }