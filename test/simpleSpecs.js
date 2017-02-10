"use strict";

angular.module('App', []).service('Results', function ($http, $q) {
    let result = {
        number: 0,
        getData: function () {
            return $http({method: 'GET', url: '/data'})
                .catch((error) => {
                    return $q.reject(error);
                }).then((response) => {
                    return response.data;
                }).then((body) => {
                    result.number = body.data;
                    return body
                })
                ;
        }
    };
    return result;
});

describe('Promises', () => {

    beforeEach(module('App'));

    var Results, $httpBackend;
    beforeEach(inject(function (_$httpBackend_, _Results_) {
        Results = _Results_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/data').respond({"data": 42});
        expect(Results.number).toBe(0);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('works', () => {
        Results.getData();
        $httpBackend.flush();
        expect(Results.number).toBe(42);
    });
    it('still works', () => {
        Results.getData()
            .then(() => {
                expect(Results.number).toBe(42);
            });
        $httpBackend.flush();
    });
    it('works again', () => {
        const res = Results.getData();
        $httpBackend.flush();
        expect(res.$$state.value.data).toBe(42);
    });
    it('works too', () => {
        var final;
        const res = Results.getData().then((data) => final = data);
        $httpBackend.flush();
        expect(final.data).toBe(42);
    });
    it('works fine', () => {
        Results.getData()
            .then((final) => expect(final.data).toBe(42));
        $httpBackend.flush();
    });
    it('works too 2', (done) => {
        Results.getData()
            .then((final) => expect(final.data).toBe(42));
        $httpBackend.flush();
        done();
    });
    xit('doesn\'t works because of synchronous resolution of done => aftereach', (done) => {
        Results.getData()
            .then((final) => expect(final.data).toBe(42))
            .finally(done);
        setTimeout(function () {
            $httpBackend.flush();
        }, 0)
    });
});
