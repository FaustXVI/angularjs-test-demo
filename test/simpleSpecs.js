"use strict";

angular.module('App', []).service('Results',function ($http) {
    return {
        toto: function () {
            return 42;
        }
    }
});

describe('Promises', () => {

    beforeEach(module('App'));

    var Results;
    beforeEach(inject(function (_$httpBackend_,_Results_) {
        Results = _Results_;
        console.log(_Results_)
    }));
    it('works', () => {
        expect(Results.toto()).toBe(42);
    });
});
