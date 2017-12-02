//Angular Imports
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//Material design imports (this one is an oddity, so it isn't imported in the MD module with 
//the rest of the material design stuff)
import { MatSnackBarModule  } from '@angular/material';

//Apollo imports
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Library imports
import { Constants } from '../lib/constants';

import { SnackBarComponent } from '../uiModule/ui.module';

//Local imports
import { HttpMessage } from './httpMessage';
import { HttpMessageType } from './httpMessageType';
import { HttpResult } from './httpResult';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { AppBarService } from './appBar.service';

//Because some of the modules in this app are lazy loaded, need to 
//do this fancy for root stuff. This is a great example: https://angular-2-training-book.rangle.io/handout/modules/shared-di-tree.html
@NgModule({
    imports: [
        HttpModule,
        MatSnackBarModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})
export class ServiceModule {

  constructor(apollo: Apollo, httpLink: HttpLink){

    apollo.create({
      link: httpLink.create({
        uri: Constants.baseUrl + '/graphql'
      }),
      cache: new InMemoryCache()
    });

  }

  static forRoot(): ModuleWithProviders  {
    return {
  		ngModule: ServiceModule,
  		providers: [
        AppBarService,
  			HttpService,
        UserService
  		]
    }
  }
}

export { HttpResult } from './httpResult';
export { HttpMessage } from './httpMessage';
export { HttpMessageType } from './httpMessageType';
export { HttpService } from './http.service';
export { UserService } from './user.service';
export { AppBarService } from './appBar.service';