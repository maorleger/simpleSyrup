import { UtilityFunctions } from './utilityFunctions';

describe('UtilityFunctions', () => {

	describe("isNullUndefinedOrEmpty", () =>{
		
		it("Returns true when given null", () => {
			expect(UtilityFunctions.isNullUndefinedOrEmpty(null)).toBeTruthy();
		});

		it("Returns true when given undefined", () => {
			expect(UtilityFunctions.isNullUndefinedOrEmpty(undefined)).toBeTruthy();
		});

		it("Returns true when given an empty string", () => {
			expect(UtilityFunctions.isNullUndefinedOrEmpty("")).toBeTruthy();
		});

		it("Returns false when given a string", () => {
			expect(UtilityFunctions.isNullUndefinedOrEmpty("test")).toBeFalsy();
		});

	});

	describe("isNullOrUndefined", () => {

		it("Returns true when given null", () => {
			expect(UtilityFunctions.isNullOrUndefined(null)).toBeTruthy();
		});		

		it("Returns true when given undefined", () => {
			expect(UtilityFunctions.isNullOrUndefined(undefined)).toBeTruthy();
		});

		it("Returns false when given an object", () => {
			expect(UtilityFunctions.isNullOrUndefined(new Object())).toBeFalsy();
		});

	});

});
