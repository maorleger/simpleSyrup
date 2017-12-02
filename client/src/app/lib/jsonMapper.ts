import { IJsonMetaData } from './iJsonMetaData';
import { JsonProperty, JsonPropertyInfo } from './jsonProperty';

export class JsonMapper {

    /*
    * Indicates if the given object is a primitive type (string, number, or boolean).
    *
    * Source: http://cloudmark.github.io/Json-Mapping/
    */
    static isPrimitive(obj) {
        
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }

        return !!(obj instanceof String || obj === String || obj instanceof Number || obj === Number || obj instanceof Boolean || obj === Boolean);
    }
    
    /*
    * Source: http://cloudmark.github.io/Json-Mapping/
    */
    static getClazz(target: any, propertyKey: string): any {
        return Reflect.getMetadata("design:type", target, propertyKey)
    }
    
    /*
    * Source: http://cloudmark.github.io/Json-Mapping/
    */
    static getJsonProperty<T>(target: any, propertyKey: string):  IJsonMetaData<T> {
        return Reflect.getMetadata(JsonPropertyInfo.propertyDecoratorKey, target, propertyKey);
    }

    /*
    * Source: http://cloudmark.github.io/Json-Mapping/
    */
    static isArray(object) {

        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    }

    /*
    * Deserializes the given json object into an object of the given type T.
    *
    * Source: http://cloudmark.github.io/Json-Mapping/
    */
    static deserialize<T>(clazz:{new(): T}, jsonObject) {

        //Verify the arguments given are valid
        if ((clazz === undefined) || (jsonObject === undefined)){
            return undefined;
        }

        //Create a new object of the given type
        let obj = new clazz();

        //For each of the properties in the class of the given type
        Object.keys(obj).forEach((key) => {

            let propertyMetadataFn:(IJsonMetaData) => any = (propertyMetadata)=> {
            
                let propertyName = propertyMetadata.name || key;
                let innerJson = undefined;
                innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = JsonMapper.getClazz(obj, key);

                if (JsonMapper.isArray(clazz)) {

                    let metadata = JsonMapper.getJsonProperty(obj, key);

                    if (metadata.clazz || JsonMapper.isPrimitive(clazz)) {

                        if (innerJson && JsonMapper.isArray(innerJson)) {
                            return innerJson.map(
                                (item)=> JsonMapper.deserialize(metadata.clazz, item)
                            );
                        } else {
                            return undefined;
                        }
                    } else {
                        return innerJson;
                    }

                } else if (!JsonMapper.isPrimitive(clazz)) {

                    if(innerJson === undefined){
                        return null;
                    }

                    return JsonMapper.deserialize(clazz, innerJson);
                    
                } else {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
                
            };

            let propertyMetadata = JsonMapper.getJsonProperty(obj, key);

            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });

        return obj;
    }
}
