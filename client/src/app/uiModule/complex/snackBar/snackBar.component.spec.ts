//Local folder imports
import { SnackBarComponent } from './snackBar.component';

describe('SnackBar Component', () => {

  let testComponent: SnackBarComponent;
  
  it('showActionButton is calculated correctly', () => {

    let data: any;

    //Ensure action button is not shown when empty string is provided
    data = {
      action: ""
    }

    testComponent = new SnackBarComponent(data);
    expect(testComponent.showActionButton).toBeFalsy();

    //Ensure action button is not shown when null is provided
    data = {
      action: null
    }

    testComponent = new SnackBarComponent(data);
    expect(testComponent.showActionButton).toBeFalsy();

    //Ensure action button is not shown when undefined is provided
    data = {
      action: undefined
    }

    testComponent = new SnackBarComponent(data);
    expect(testComponent.showActionButton).toBeFalsy();

    //Ensure action button is shown when something is provided
    data = {
      action: "undo"
    }

    testComponent = new SnackBarComponent(data);
    expect(testComponent.showActionButton).toBeTruthy();


  });

});
