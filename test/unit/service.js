describe("angular audio sprite service", function() {

    var $httpBackend, $rootScope, createController, authRequestHandler;

    beforeEach(module("ngAudioSprite.service"));

    beforeEach(inject(function($injector) {

        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', 'app/audio/sprite.json').respond({
            "resources": [
                "sprite.ogg",
                "sprite.m4a",
                "sprite.mp3",
                "sprite.ac3"
            ],
            "spritemap": {
                "round-final": {
                    "start": 0,
                    "end": 1.92,
                    "loop": false
                },
                "round1": {
                    "start": 3,
                    "end": 4.824013605442177,
                    "loop": false
                }
            }
        });

        $rootScope = $injector.get('$rootScope');
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should expose an id STRING property", inject(function(audioSprite) {
        expect(audioSprite.id).toBeDefined();
        expect(typeof audioSprite.id).toEqual("string");
    }));

    it("should expose a play method", inject(function(audioSprite) {
        expect(audioSprite.play).toBeDefined();
        expect(typeof audioSprite.play).toEqual("function");
    }));

    it("should expose a load method", inject(function(audioSprite) {
        expect(audioSprite.load).toBeDefined();
        expect(typeof audioSprite.load).toEqual("function");
    }));

    it("should update the id property on play", inject(function(audioSprite) {
        expect(audioSprite.id).toEqual("");
        audioSprite.play("a");
        expect(audioSprite.id).toEqual("a");
    }));

    it("should return audio sprite config on getSprite", inject(function(audioSprite) {
        $httpBackend.expectGET("app/audio/sprite.json");
        audioSprite.load("app/audio/sprite.json");
        $httpBackend.flush();
    }));

});