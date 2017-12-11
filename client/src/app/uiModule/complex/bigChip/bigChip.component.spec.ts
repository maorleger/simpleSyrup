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

  it('selected is updated when component is clicked', () => {

    //Ensure the component is selectable
    testComponent.selectable = true;

    //selected property should be initalized to false
    expect(testComponent.selected).toBeFalsy();

    //Click the component
    testComponent.onBigChipClicked(null);

    //Selected should now be true
    expect(testComponent.selected).toBeTruthy();

  });

  it("bigChipClicked event is raised when component is clicked", (done) => {

    //Ensure the component is selectable
    testComponent.selectable = true;

    //The bigChipClicked event should be raised
    testComponent.bigChipClicked.subscribe(() => {
      done();
    });

    //Click the component
    testComponent.onBigChipClicked(null);

  });

  it("clicking component when it's not selectable does nothing", (done) => {

    //Ensure the component is not selectable
    testComponent.selectable = false;

    //selected property should be initalized to false
    expect(testComponent.selected).toBeFalsy();

    //This event should never be thrown; so raise an error if it does
    testComponent.bigChipClicked.subscribe(() => {
      throw Error("bigChipClicked raised when it should not have been.")
    });

    //Click the component
    testComponent.onBigChipClicked(null);

    //Since the component was not selectable, the 'selected' property should still be false
    expect(testComponent.selected).toBeFalsy();

    done();

  });

  it("isPictureLoaded() property is updated when the picture is done loading", () => {

    //isPictureLoaded property should be initialized to false
    expect(testComponent.isPictureLoaded).toBeFalsy();

    //Load the picture
    testComponent.onPictureLoad(null);

    //isPictureLoaded property should now be true
    expect(testComponent.isPictureLoaded).toBeTruthy();

  });

  it("pictureLoaded event is raised when picture is done loading", (done) => {

    let mockPhotoUrl: string = "some-url.png";

    testComponent.pictureUrl = mockPhotoUrl;

    //The pictureLoaded event should be raised
    testComponent.pictureLoaded.subscribe((photoUrl) => {

      //Event should pass on the url of the phot
      expect(mockPhotoUrl).toEqual(photoUrl);

      done();

    });

    //Load the picture
    testComponent.onPictureLoad(null);

  })

});
