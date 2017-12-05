//Anguular imports
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ssLoaderSpinner',
  templateUrl: './loaderSpinner.component.html',
  styleUrls: ['./loaderSpinner.component.scss']
})

export class LoaderSpinnerComponent implements OnInit {

	get marginTop(): string{
		return window.innerHeight * 0.12 + "px";
	}

	/***********
    * ng Events
    ************/

	ngOnInit() { }


}