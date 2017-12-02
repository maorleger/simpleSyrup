//Library imports
import { JsonProperty } from '../jsonProperty';
import { UtilityFunctions } from '../utilityFunctions';

//Domain imports
import { DomainBase } from './domainBase';

export class User extends DomainBase{

  //Property backing variables
  
  @JsonProperty('email')
  private _email: string = null;
  
  @JsonProperty('lastName')
  private _lastName: string = null;

  @JsonProperty('firstName')
  private _firstName: string = null;

  @JsonProperty('photoUrl')
  private _photoUrl: string = null;

  //Calculated properties
  private _initials: string = null;
  private _displayname: string = null;
  
  /************
  * Properties
  *************/

  get firstName(): string{
    return this._firstName;
  }

  set firstName(val: string){

    this._firstName = val;
    this.calculateIdentifyingFields();

  }

  get lastName(): string{
    return this._lastName;
  }

  set lastName(val: string){

    this._lastName = val;
    this.calculateIdentifyingFields();

  }

  get email(): string{
    return this._email;
  }

  set email(val: string){

    this._email = val;
    this.calculateIdentifyingFields();

  }

  get photoUrl(): string{
    return this._photoUrl;
  }

  set photoUrl(val: string){
    this._photoUrl = val;
  }

  /*
  *  Indicates if this participant is missing all identifying info (first name, last name, and email).
  */
  get isMissingIdentifyingInfo(): boolean{

    return UtilityFunctions.isNullUndefinedOrEmpty(this._firstName) && 
      UtilityFunctions.isNullUndefinedOrEmpty(this._lastName) && 
      UtilityFunctions.isNullUndefinedOrEmpty(this._email);

  }

  /*
  * The initials of this participant. If both first and last name exist, this will be the first 
  * letters of each. If only first name exists, then the first two letters of the first name. If
  * only the last name exists, then only the first two letters from the last name. If neither of
  * those exist and email does, then the first two letters of the email address. If none of those
  * three fields are populated, this is an empty string.
  */
  get initials(): string{

    //If _initials is null, it might not have been calculated yet; try nowS
    if(this._initials === null){
      this.calculateIdentifyingFields();
    }

    return this._initials;
  }

  /*
  * The display name of this participant. If both the first name and last name exist, this will be
  * both names. If only the first name exists, then just that. If only the last name, then just that.
  * If neither of those exist and email does, then this will be the email. If none of those three
  * fields are populated, this will be an empty string.
  */
  get displayName(): string{

    //If _displayname is null, it might not have been calculated yet; try nowS
    if(this._displayname === null){
      this.calculateIdentifyingFields();
    }

    return this._displayname;
  }

  /****************
  * Private methods
  ****************/

  /*
  * Calculates the initials and display name for this participant.
  */
  private calculateIdentifyingFields(){
    this._initials = this.calculateInitials(this._firstName, this._lastName, this._email);
    this._displayname = this.calculateDisplayName(this._firstName, this._lastName, this._email);
  }

  private calculateInitials(firstName: string, lastName: string, email: string): string{

    //If the first name field is populated
    if(!UtilityFunctions.isNullUndefinedOrEmpty(firstName)){

      //And the last name field is populated, use both. Otherwise, just use the first name
      if(!UtilityFunctions.isNullUndefinedOrEmpty(lastName)){
        return firstName.substring(0, 1) + lastName.substring(0, 1);
      }

      else{
        return firstName.substring(0, 2);
      }

    }

    //If there is no first name but a last name, use that
    else if(!UtilityFunctions.isNullUndefinedOrEmpty(lastName)){
      return lastName.substring(0, 2);
    }

    //If there is no first name nor a last name, use the email
    else if(!UtilityFunctions.isNullUndefinedOrEmpty(email)){
      return email.substring(0, 2);
    }

    //First name, last name, and email are missing; return empty string
    return "";

  }

  private calculateDisplayName(firstName: string, lastName: string, email: string): string{

    let name: string = "";

    //If the first name exists
    if(!UtilityFunctions.isNullUndefinedOrEmpty(firstName)){

      name = firstName;

      //Append the last name if it exists
      if(!UtilityFunctions.isNullUndefinedOrEmpty(lastName)){
        name = name + " ";
      }

    }

    //If the last name exists, use that
    if(!UtilityFunctions.isNullUndefinedOrEmpty(lastName)){
      name = name + lastName;
    }

    //If first name and last name are both missing, use the email
    if(UtilityFunctions.isNullUndefinedOrEmpty(name) && !UtilityFunctions.isNullUndefinedOrEmpty(email)){
      name = email;
    }

    //If first name, last name, and email are all missing, return empty string
    return name;

  }

}