describe('Home page', () => {
    beforeAll(done => {
        browser.get('/')
        .then(done);
    });

    it('should have region', () => {
        browser.sleep(1000);
        let region:any = element(by.css('.region'));
        expect(region.isDisplayed()).toBeTruthy();
    });
});
