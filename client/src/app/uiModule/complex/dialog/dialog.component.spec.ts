//Local folder imports
import { DialogComponent } from './dialog.component';

describe('Dialog Component', () => {

  let testComponent: DialogComponent;
  
  it('showTitle is calculated correctly', () => {

    let data: any;

    //Ensure title is not shown when empty string is provided
    data = {
      title: ""
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showTitle).toBeFalsy();

    //Ensure title is not shown when null is provided
    data = {
      title: null
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showTitle).toBeFalsy();

    //Ensure title is not shown when undefined is provided
    data = {
      title: undefined
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showTitle).toBeFalsy();

    //Ensure title is shown when something is provided
    data = {
      title: "title"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showTitle).toBeTruthy();


  });

  it('showMessage is calculated correctly', () => {

    let data: any;

    //Ensure message is not shown when empty string is provided
    data = {
      message: ""
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showMessage).toBeFalsy();

    //Ensure message is not shown when null is provided
    data = {
      message: null
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showMessage).toBeFalsy();

    //Ensure message is not shown when undefined is provided
    data = {
      message: undefined
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showMessage).toBeFalsy();

    //Ensure message is shown when something is provided
    data = {
      message: "message"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showMessage).toBeTruthy();


  });

  it('showAffirmativeButton is calculated correctly', () => {

    let data: any;

    //Ensure affirmative button is not shown when empty string is provided
    data = {
      affirmativeText: ""
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showAffirmativeButton).toBeFalsy();

    //Ensure affirmative button is not shown when null is provided
    data = {
      affirmativeText: null
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showAffirmativeButton).toBeFalsy();

    //Ensure affirmative button is not shown when undefined is provided
    data = {
      affirmativeText: undefined
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showAffirmativeButton).toBeFalsy();

    //Ensure affirmative button is shown when something is provided
    data = {
      affirmativeText: "yes"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showAffirmativeButton).toBeTruthy();


  });

  it('showNegativeButton is calculated correctly', () => {

    let data: any;

    //Ensure negative button is not shown when empty string is provided
    data = {
      negativeText: ""
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showNegativeButton).toBeFalsy();

    //Ensure negative button is not shown when null is provided
    data = {
      negativeText: null
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showNegativeButton).toBeFalsy();

    //Ensure negative button is not shown when undefined is provided
    data = {
      negativeText: undefined
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showNegativeButton).toBeFalsy();

    //Ensure negative button is shown when something is provided
    data = {
      negativeText: "no"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showNegativeButton).toBeTruthy();


  });

  it('showOkButton is calculated correctly', () => {

    let data: any;

    //Ensure ok button is not shown when affirmative text is provided
    data = {
      affirmativeText: "yes"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showOkButton).toBeFalsy();

    //Ensure ok button is not shown when negative text is provided
    data = {
      negativeText: "no"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showOkButton).toBeFalsy();

    //Ensure ok button is shown when neither affirmation or negative text is given
    data = { }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showOkButton).toBeTruthy();

    //Ensure ok button is not shown when both affirmation or negative text is given
    data = {
      negativeText: "no",
      affirmativeText: "yes"
    }

    testComponent = new DialogComponent(null, data);
    expect(testComponent.showOkButton).toBeFalsy();

  });

});
