//Lirbary imports
import { Participant } from '../../../../lib/domain/domain.module';

//Local folder imports
import { ParticipantBigChipComponent } from './participantBigChip.component';

describe('ParticipantBigChipComponent', () => {

  let testComponent: ParticipantBigChipComponent;
  
  beforeEach(() => {
    testComponent = new ParticipantBigChipComponent();    
  });

  it('Will not accept a null or undefined participant', () => {

    expect(function() { testComponent.participant = null }).toThrow();
    expect(function() { testComponent.participant = undefined }).toThrow();

  });

  it('Status class returns proper value', () => {

    let participant: Participant = new Participant();
    participant.status = "Tentative";
    testComponent.participant = participant;

    expect(testComponent.statusClass).toEqual("tentative");

  });

  it("pictureLoaded event is emitted when picture is done loading", (done) => {

    testComponent.pictureLoaded.subscribe(() => {
      done();
    });

    testComponent.onPictureLoad(null);

  });

});
