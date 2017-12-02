//Local folder imports
import { AppBarService } from './appBar.service';

describe('AppBarService', () => {

	let testAppBarService: AppBarService;

	beforeEach(() => {

		testAppBarService = new AppBarService;

	});

	it('titleSource fires when updateTitle is called', done => {

		let newTitle: string = "Ace's Birthday!";

		testAppBarService.titleSource.subscribe((title: string) => {
			expect(title).toEqual(newTitle);
			done();
		});

		testAppBarService.updateTitle(newTitle);

	});


});