export class UtilityFunctions {

    /**
     * Determines if given string object is null, undefined or empty string. If a the object passed to this function
     * is not a string, this function will just dermined if it is null or undefined.
	 *
     * @param The string to check.
     */
    static isNullUndefinedOrEmpty(object: string): boolean {

        if (this.isNullOrUndefined(object)){
        	return true;
        }

        return object === "";
   }

	/* Determines if the given object is null or undefined.
	 *
	 * @param object The object to check.
	 */
	static isNullOrUndefined(object: Object): boolean {
	    return object === null || object === undefined;
	}

    static isArrayNullUndefinedOrEmpty(array: Object[]): boolean {
        return array === null || array === undefined || array.length <= 0;
    }
}