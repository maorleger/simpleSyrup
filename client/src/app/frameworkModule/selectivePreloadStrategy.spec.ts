//Angular imports
import { Route } from '@angular/router';

//rxjs imports
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

//Local imports
import { SelectivePreloadingStrategy } from './selectivePreloadStrategy';

describe('SelectivePreloadingStrategy', () => {

	let underTest: SelectivePreloadingStrategy;

	beforeEach(() => {
		underTest = new SelectivePreloadingStrategy();    
	});

	describe("Preload", () =>{

		//Arbitrary load function that just returns a random value. This value can be used to determine if
		//SelectivePreloadingStrategy.preload returned the right value 
		let loadFunctionReturnValue: number = 17;
		let loadFuncion = function(){ return Observable.of(loadFunctionReturnValue); }
		
		it("Does not preload module when preload flag is missing", done => {

			let route = {
				data: null
			}

			underTest.preload(route as Route, loadFuncion).subscribe(result => {

				//Should have returned an oberservable that returns null
				expect(result).toBeNull();
				done();

			});
			
		});

		it("Does not preload module when preload flag is false", done => {

			let route = {
				data: {
					preload: false
				}
			}

			underTest.preload(route as Route, loadFuncion).subscribe(result => {

				//Should have returned an oberservable that returns null
				expect(result).toBeNull();
				done();

			});
			
		});

		it("Preloads module when preload flag is true", done => {

			let route = {
				data: {
					preload: true
				}
			}

			underTest.preload(route as Route, loadFuncion).subscribe(result => {

				//Should have called the passed in loadFunction, which returns an observable with an number
				expect(result).toEqual(loadFunctionReturnValue);
				done();

			});
			
		});

	});

});
