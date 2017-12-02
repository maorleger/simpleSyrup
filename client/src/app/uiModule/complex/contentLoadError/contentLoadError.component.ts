import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ssContentLoadError',
	templateUrl: './contentLoadError.component.html',
	styleUrls: ['./contentLoadError.component.scss']
})
export class ContentLoadErrorComponent implements OnInit {

	@Input()
	message: string;

	constructor() { }

	ngOnInit() {
	}

}
