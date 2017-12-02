//Local folder imports
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {

  let testComponent: ChipComponent;
  
  beforeEach(() => {
    testComponent = new ChipComponent();    
  });

  it('showPicture property is calculated correctly', () => {

    testComponent.photoUrl = null;
    expect(testComponent.showPicture).toBeFalsy();

    testComponent.photoUrl = undefined;
    expect(testComponent.showPicture).toBeFalsy();    

    testComponent.photoUrl = "text";
    expect(testComponent.showPicture).toBeTruthy();

  });

  it('removeButtonClicked event is raised when remove button is clicked', (done) => {

    testComponent.removeButtonClicked.subscribe((user) => {

      done();

    });

    testComponent.onRemoveButtonClicked(null);

  });

});
