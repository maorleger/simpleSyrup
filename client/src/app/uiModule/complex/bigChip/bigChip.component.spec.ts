//Local folder imports
import { BigChipComponent } from './bigChip.component';

describe('BigChipComponent', () => {

  let testComponent: BigChipComponent;
  
  beforeEach(() => {
    testComponent = new BigChipComponent();    
  });

  it('showPicture property is calculated correctly', () => {

    expect(testComponent.showPicture).toBeFalsy();

    testComponent.pictureUrl = "url";

    expect(testComponent.showPicture).toBeTruthy();

  });

  //TODO: Test for click event

});
