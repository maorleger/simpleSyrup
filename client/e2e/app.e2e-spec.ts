import { SimpleSyrupAppPage } from './app.po';

describe('simple-syrup-app App', () => {
  let page: SimpleSyrupAppPage;

  beforeEach(() => {
    page = new SimpleSyrupAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
