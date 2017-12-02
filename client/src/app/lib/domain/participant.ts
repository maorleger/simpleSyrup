//Library imports
import { JsonProperty } from '../jsonProperty';
import { UtilityFunctions } from '../utilityFunctions';

//Domain imports
import { User } from './user';
import { DomainBase } from './domainBase';

export class Participant extends DomainBase{

	@JsonProperty('status')
	public status: string = null;

	@JsonProperty('eventId')
	public eventId: number = null;

	@JsonProperty('userId')
	public userId: number = null;

	@JsonProperty({clazz: User})
	user: User = null;

}