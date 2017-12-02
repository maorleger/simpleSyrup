//angular imports
import { ActivatedRoute, ActivatedRouteSnapshot, Data, ParamMap, Params, Route, Router, UrlSegment  } from '@angular/router';

//rxjs imports
import { Observable } from 'rxjs/Observable';

export class MockActivatedRoute implements ActivatedRoute{
    snapshot : ActivatedRouteSnapshot;
    url : Observable<UrlSegment[]>;
    params : Observable<Params>;
    paramMap : Observable<ParamMap>;
    queryParams : Observable<Params>;
    queryParamMap : Observable<ParamMap>;
    fragment : Observable<string>;
    data : Observable<Data>;
    outlet : string;
    component : any|string;
    routeConfig : Route;
    root : ActivatedRoute;
    parent : ActivatedRoute;
    firstChild : ActivatedRoute;
    children : ActivatedRoute[];
    pathFromRoot : ActivatedRoute[];
}
