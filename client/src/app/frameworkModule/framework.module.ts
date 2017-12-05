//Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material design imports: Since the app bar needs the progress loader, just loading that one component instead of the whole material module
import { MatProgressBarModule } from '@angular/material';

//Service module imports
import { ServiceModule } from '../serviceModule/service.module'

//Local components
import { SimpleSyrupComponent } from './simpleSyrup/simpleSyrup.component';
import { AppBarComponent } from './appBar/appBar.component';
import { AppRoutingModule } from './appRouting.module';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

@NgModule({
  declarations: [
    SimpleSyrupComponent,
    AppBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressBarModule,
    ServiceModule.forRoot(),
  ],
  providers: [],
  bootstrap: [SimpleSyrupComponent]
})
export class FrameworkModule { }