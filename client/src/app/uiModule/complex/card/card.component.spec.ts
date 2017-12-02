import { CardComponent } from './card.component';

describe('CardComponent', () => {

  let testComponent: CardComponent;
  
  beforeEach(() => {
    testComponent = new CardComponent();    
  });

  it('Icon is not displayed when given icon is null', () => {

    testComponent.icon = null;
    expect(testComponent.displayTitleIcon).toBeFalsy("Card component is displaying title icone when it should not be.");
    
  });

});
