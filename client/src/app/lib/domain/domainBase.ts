//Library imports
import { JsonProperty } from '../jsonProperty';

/*
* The base class for all domain objects.
*/
export class DomainBase{
	
	@JsonProperty('id')
	id: number = null;

}