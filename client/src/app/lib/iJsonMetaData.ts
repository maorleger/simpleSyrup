/**
 * Typing for JsonProperty property decorator
 */
export interface IJsonMetaData<T>{
    name?: string,
    clazz?: {new(): T}
}