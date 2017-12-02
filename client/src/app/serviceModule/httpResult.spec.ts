//Local folder imports
import { HttpResult } from './httpResult';
import { HttpMessage } from './httpMessage';
import { HttpMessageType } from './httpMessageType';

describe('HttpResult', () => {

	describe("isValid property is calculated correctly", () =>{
		
		it("Returns false when result contains error messages", () => {

			let httpResult = new HttpResult(1, [new HttpMessage("Some error message", HttpMessageType.Error)]);
			expect(httpResult.isValid).toBeFalsy();

		});

		it("Returns true when no messages exist in result", () => {

			let httpResult = new HttpResult(1, null);
			expect(httpResult.isValid).toBeTruthy();

		});

		it("Returns true when only error messages exist in result", () => {
			
			let httpResult = new HttpResult(1, [new HttpMessage("Some warning message", HttpMessageType.Warning)]);
			expect(httpResult.isValid).toBeTruthy();

		});

	});

});
