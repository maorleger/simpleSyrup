import { User } from './user';

describe('User', () => {

  let testUser: User;
  
  beforeEach(() => {
    testUser = new User();    

  });

  describe("Initials are calculated correctly", () =>{
    
    it("When first name and last name are present", () => {
      
      testUser.firstName = "Ace";
      testUser.lastName = "Base";

      expect(testUser.initials).toEqual("AB");

    });

    it("When first name is present but last name is not", () => {

      testUser.lastName = null;
      testUser.firstName = "Ace";

      expect(testUser.initials).toEqual("Ac");

    });

    it("When one-character first name is present and last name is not present", () => {

      testUser.lastName = null;
      testUser.firstName = "A";

      expect(testUser.initials).toEqual("A");

    });

    it("When last name is present but first name is not", () => {

      testUser.firstName = null;
      testUser.lastName = "Base";

      expect(testUser.initials).toEqual("Ba");

    });

    it("When one-character last name is present and first name is not present", () => {

      testUser.firstName = null;
      testUser.lastName = "B";

      expect(testUser.initials).toEqual("B");

    });

    it("When both first name and last name are not present but email is", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = "aceBase@email.com";

      expect(testUser.initials).toEqual("ac");

    });

    it("When both first name and last name are not present but one-character email is", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = "a";

      expect(testUser.initials).toEqual("a");

    });

    it("When first name, last name, and email aren't present", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = null;

      expect(testUser.initials).toEqual("");

    });

  });

describe("Display name is calculated correctly", () =>{
    
    it("When first name and last name are present", () => {
      
      testUser.firstName = "Ace";
      testUser.lastName = "Base";

      expect(testUser.displayName).toEqual("Ace Base");

    });

    it("When first name, last name, and email are present", () => {
      
      testUser.firstName = "Ace";
      testUser.lastName = "Base";
      testUser.email = "ace.base@gmail.com";

      expect(testUser.displayName).toEqual("Ace Base");

    });

    it("When first name is present but last name is not", () => {

      testUser.lastName = null;
      testUser.firstName = "Ace";

      expect(testUser.displayName).toEqual("Ace");

    });

    it("When last name is present but first name is not", () => {

      testUser.firstName = null;
      testUser.lastName = "Base";

      expect(testUser.displayName).toEqual("Base");

    });

    it("When both first name and last name are not present but email is", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = "aceBase@email.com";

      expect(testUser.displayName).toEqual("aceBase@email.com");

    });


    it("When first name, last name, and email aren't present", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = null;

      expect(testUser.displayName).toEqual("");

    });

  });

  it("isMissingIdentifyingInfo property is calculated correctly", () => {

      testUser.firstName = null;
      testUser.lastName = null;
      testUser.email = null;

      expect(testUser.isMissingIdentifyingInfo).toBeTruthy();

      testUser.firstName = "Ace";
      expect(testUser.isMissingIdentifyingInfo).toBeFalsy();
      testUser.firstName = null;

      testUser.lastName = "Base";
      expect(testUser.isMissingIdentifyingInfo).toBeFalsy();
      testUser.lastName = null;

      testUser.email = "aceBase@gmail.com";
      expect(testUser.isMissingIdentifyingInfo).toBeFalsy();
      testUser.email = null;

  });

});
