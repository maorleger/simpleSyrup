//Library imports
import { UtilityFunctions } from '../lib/utilityFunctions';

//Local folder imports
import { HttpMessage } from './httpMessage';
import { HttpMessageType } from './httpMessageType';

/*
* Class for representing the result of an http call. Details the result of the call and any messages that may
* have been returned.
*/
export class HttpResult<T> {
	
	//Value returned by the http call
	value: T;

	//Array of messages returned from the http call
	resultMessages: HttpMessage[] = [];

	constructor(value: T, messages?: HttpMessage[]){
		
		this.value = value;
		this.resultMessages = messages;

	}

	/*
	* Indicates if this http result is valid. This is determined by looking at the message (if any) returned. 
	* If there are an error messages, this is false. Otherwise, true.
	*/
	get isValid(): boolean{

		//If there are no error messages, then this result must be valid
		if(UtilityFunctions.isNullOrUndefined(this.resultMessages) || this.resultMessages.length <= 0){
			return true;
		}

		//If there are error messages, check to see if any of them are error messages
		return this.resultMessages && UtilityFunctions.isNullOrUndefined(this.resultMessages.find(message => message.type === HttpMessageType.Error));
	}

}