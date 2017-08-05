import { PocPage } from './app.po';

describe('poc App', () => {
  let page: PocPage;

  beforeEach(() => {
    page = new PocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
