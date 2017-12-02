//Local folder imports
import { Participant } from './participant';
import { JsonProperty } from '../jsonProperty';

//Domain imports
import { DomainBase } from './domainBase';

export class Event extends DomainBase{

	@JsonProperty('name')
	name: string = null;

	@JsonProperty({clazz: Participant})
	participants: Participant[] = [];
}