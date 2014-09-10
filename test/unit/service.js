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

    it("should expose an config OBJECT property", inject(function(audioSprite) {
        expect(audioSprite.config).toBeDefined();
        expect(typeof audioSprite.config).toEqual("object");
    }));

    it("should expose an muted BOOLEAN property", inject(function(audioSprite) {
        expect(audioSprite.muted).toBeDefined();
        expect(typeof audioSprite.muted).toEqual("boolean");
    }));

    it("should expose an volumeValue OBJECT property", inject(function(audioSprite) {
        expect(audioSprite.volumeValue).toBeDefined();
        expect(typeof audioSprite.volumeValue).toEqual("number");
    }));

    it("should expose a play method", inject(function(audioSprite) {
        expect(audioSprite.play).toBeDefined();
        expect(typeof audioSprite.play).toEqual("function");
    }));

    it("should expose a stop method", inject(function(audioSprite) {
        expect(audioSprite.stop).toBeDefined();
        expect(typeof audioSprite.stop).toEqual("function");
    }));

    it("should expose a mute method", inject(function(audioSprite) {
        expect(audioSprite.mute).toBeDefined();
        expect(typeof audioSprite.mute).toEqual("function");
    }));

    it("should expose a unmute method", inject(function(audioSprite) {
        expect(audioSprite.unmute).toBeDefined();
        expect(typeof audioSprite.unmute).toEqual("function");
    }));

    it("should expose a volume method", inject(function(audioSprite) {
        expect(audioSprite.volume).toBeDefined();
        expect(typeof audioSprite.volume).toEqual("function");
    }));

    it("should expose a configure method", inject(function(audioSprite) {
        expect(audioSprite.configure).toBeDefined();
        expect(typeof audioSprite.configure).toEqual("function");
    }));

    it("should expose a spritemap method", inject(function(audioSprite) {
        expect(audioSprite.spritemap).toBeDefined();
        expect(typeof audioSprite.spritemap).toEqual("function");
    }));

    it("should expose a observe method", inject(function(audioSprite) {
        expect(audioSprite.observe).toBeDefined();
        expect(typeof audioSprite.observe).toEqual("function");
    }));

    it("should expose a destroy method", inject(function(audioSprite) {
        expect(audioSprite.destroy).toBeDefined();
        expect(typeof audioSprite.destroy).toEqual("function");
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

    it("should update the id property on play", inject(function(audioSprite) {
        expect(audioSprite.id).toEqual("");
        audioSprite.play("a");
        expect(audioSprite.id).toEqual("a");
    }));

    it("should set the configuration property when configure is used", inject(function(audioSprite) {

        var data = {
            resources: ["a"],
            spritemap: {
                "a": true
            }
        };

        audioSprite.configure(data);

        expect(audioSprite.config).toEqual(data);

    }));

});