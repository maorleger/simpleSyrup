//Lirbary imports
import { User } from '../../../../lib/domain/domain.module';

//Local folder imports
import { UserChipComponent } from './userChip.component';

describe('UserChipComponent', () => {

  let testComponent: UserChipComponent;
  
  beforeEach(() => {
    testComponent = new UserChipComponent();    
  });

  it('Will not accept a null or undefined user', () => {

    expect(function() { testComponent.user = null }).toThrow();
    expect(function() { testComponent.user = undefined }).toThrow();

  });

  it('removeButtonClicked event is raised when remove button is clicked', (done) => {

    testComponent.user = new User();
    testComponent.user.firstName = "First";
    testComponent.user.lastName = "Last";
    testComponent.user.id = 21;

    testComponent.removeButtonClicked.subscribe((user) => {

      expect(user).toEqual(testComponent.user);
      done();

    });

    testComponent.onRemoveButtonClicked(null);

  });

});
