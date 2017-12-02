import 'reflect-metadata';
import { UtilityFunctions } from './utilityFunctions';
import { IJsonMetaData } from './iJsonMetaData';

export class JsonPropertyInfo{

	/*
	* Gets the name of the property decorator that defines what the json property is.
	*/
	static get propertyDecoratorKey(){
		return 'jsonProperty';	
	}

}

/**
 * Defines the 'JsonProperty' decorator.
 *
 * Source: http://cloudmark.github.io/Json-Mapping/
 */
export function JsonProperty<T>(metadata?:IJsonMetaData<T>|string): any {

    if (metadata instanceof String || typeof metadata === "string"){
        return Reflect.metadata(JsonPropertyInfo.propertyDecoratorKey, {
            name: metadata,
            clazz: undefined
        });
    } else {
        let metadataObj = <IJsonMetaData<T>>metadata;
        return Reflect.metadata(JsonPropertyInfo.propertyDecoratorKey, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }

}
