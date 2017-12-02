//Lirbary imports
import { Participant } from '../../../../lib/domain/domain.module';

//Local folder imports
import { UserBigChipComponent } from './userBigChip.component';

describe('UserBigChipComponent', () => {

  let testComponent: UserBigChipComponent;
  
  beforeEach(() => {
    testComponent = new UserBigChipComponent();    
  });

  it('Will not accept a null or undefined user', () => {

    expect(function() { testComponent.user = null }).toThrow();
    expect(function() { testComponent.user = undefined }).toThrow();

  });

  it('userBigChipClicked event is raised when component is clicked', (done) => {

    testComponent.userBigChipClicked.subscribe(() => {
      done();
    });

    testComponent.onUserBigChipClick(null);

  });

});
