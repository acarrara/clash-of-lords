beforeEach(() => {
    jasmine.addMatchers({
        toContainText: ():any => {
            return {
                compare: (actual, expectedText):any => {
                    let actualText:string = actual.textContent;
                    return {
                        pass: actualText.indexOf(expectedText) > -1,
                        get message():any { return 'Expected ' + actualText + ' to contain ' + expectedText; }
                    };
                }
            };
        }
    });
});
